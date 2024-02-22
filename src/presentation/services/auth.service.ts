import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain"; 
import { JwtAdapter , bcryptAdapter } from "../../config";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exists");

    try {
      const newUser = new UserModel(registerUserDto);
      
      //encriptar contraseña
      newUser.password = bcryptAdapter.hash(registerUserDto.password)
      
      await newUser.save();
      // TODO: JWT para mantener la autenticación del usuario

      // TODO: enviar correo electronico de confirmación

      const { password, ...userEntity } = UserEntity.fromObject(newUser);

      return {
        user:  userEntity  ,
        token: "ABC",
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

      const token = await JwtAdapter.generateToken({id: user.id, email: user.email})
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

}
