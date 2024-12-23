import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";

// Registrar usuario
export const register = async (req, res) => {
  const {
    userName,
    password,
    email,
    phone,
    street,
    number,
    city,
    state,
    zipCode,
    profilePicture,
  } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El correo ya está en uso"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      password: passwordHash,
      email,
      phone,
      street,
      number,
      city,
      state,
      zipCode,
      profilePicture,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      userName: userSaved.userName,
      email: userSaved.email,
      phone: userSaved.phone,
      street: userSaved.street,
      number: userSaved.number,
      city: userSaved.city,
      state: userSaved.state,
      zipCode: userSaved.zipCode,
      profilePicture: userSaved.profilePicture,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).json({ message: "Error al registrar", error: error.message });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    console.log('token?', token)
    res.json({
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email,
      phone: userFound.phone,
      street: userFound.street,
      number: userFound.number,
      city: userFound.city,
      state: userFound.state,
      zipCode: userFound.zipCode,
      profilePicture: userFound.profilePicture,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};

// Cerrar sesión
export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

// Obtener perfil del usuario
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    userName: userFound.userName,
    email: userFound.email,
    phone: userFound.phone,
    street: userFound.street,
    number: userFound.number,
    city: userFound.city,
    state: userFound.state,
    zipCode: userFound.zipCode,
    profilePicture: userFound.profilePicture,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

// Verificar token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No está autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No está autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No está autorizado" });

    res.status(200).json({ message: "Token válido", user: userFound });
  });
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await User.findByIdAndDelete(id);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado", user: userFound });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
  }
};

// Obtener lista de usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};

// Actualizar usuario (incluye edición de perfil)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userName,
      email,
      phone,
      street,
      number,
      city,
      state,
      zipCode,
      profilePicture,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        userName,
        email,
        phone,
        street,
        number,
        city,
        state,
        zipCode,
        profilePicture,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
  }
};
