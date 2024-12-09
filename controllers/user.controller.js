import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const { userName, password, email } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El correo ya esta en uso"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      password: passwordHash,
      email,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    // res.json({
    //     message:"user creado correctamente"
    // })
    res.json({
      id: userSaved._id,
      userName: userSaved.userName,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    res
      .status(500)
      .json({ message: "Error al registrar", error: error.message });
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    // res.json({
    //     message:"user creado correctamente"
    // })
    res.json({
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    res
      .status(500)
      .json({ message: "Error al registrar", error: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "usuario no encontrado" });

  return res.json({
    id: userFound._id,
    userName: userFound.userName,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
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
    res
      .status(500)
      .json({ message: "Error al eliminar usuario", error: error.message });
  }
};

// Obtener lista de usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener usuarios", error: error.message });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, phone, address, roles, profilePicture } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        userName,
        email,
        phone,
        address: {
          street: address.street,
          number: address.number,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
        },
        roles,
        profilePicture: profilePicture || "",
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar usuario", error: error.message });
  }
};
