import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain"; 
import { JwtAdapter , bcryptAdapter, envs } from "../../config";
import { EmailService } from "./email.service";
 

export class AuthService {
  constructor(
    private readonly emailService: EmailService
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exists");

    try {
      const newUser = new UserModel(registerUserDto);
      
      //encriptar contraseña
      newUser.password = bcryptAdapter.hash(registerUserDto.password)
      
      await newUser.save();

      await this.sendEmailValidatonLink(registerUserDto.email)

      const { password, ...userEntity } = UserEntity.fromObject(newUser);
      
      // JWT para mantener la autenticación del usuario

      const token = await JwtAdapter.generateToken({id: newUser.id})
      if(!token) throw CustomError.internalServer("Error while creating JWT")

      return {
        user:  userEntity  ,
        token: token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    try {
    
    const user = await UserModel.findOne({ email: loginUserDto.email });
    
    if (!user) throw CustomError.badRequest("Email not exists, register first");
    else {
 
      
      //encriptar contraseña
      if( !bcryptAdapter.compare(loginUserDto.password, user.password))
        throw CustomError.badRequest("Password not match, try again")
       

      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({id: user.id})
      if(!token) throw CustomError.internalServer("Error while creating JWT")


      return {
        user:  userEntity  ,
        token: token,
      };
    }
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }


  }

  private sendEmailValidatonLink = async (email: string )=> {
      
    const token = await JwtAdapter.generateToken({email})
    if(!token) throw CustomError.internalServer("Error while creating JWT")
    
    const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>

      <a href="${link}">Click here</a>
    `
    const options = {
        to : email,
        subject: "Validate your email",
        htmlBody: html

    }
    const isSet = await this.emailService.sendEmail(options)
    if(!isSet) throw CustomError.internalServer("Error while sending email")
    return true
  }

  public validateEmail = async (token: string) => {
      const payload = await JwtAdapter.validateToken(token)
      if(!payload) throw CustomError.unauthorized("Invalid token")
      const {email} = payload as {email: string}

      if(!email) throw CustomError.internalServer("Email not in token")

      const user = await UserModel.findOne({email})
      if(!user) throw CustomError.internalServer("Email not exists")

      user.emailValidate = true
      await user.save()

      return true 
  }
}
