// CRUD/src/scripts/createAdmin.js
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const createAdmin = async () => {
  try {
    
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin10';

    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new User({
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true
      });

      await admin.save();
      console.log('Administrador creado con éxito');
    } else {
      console.log('El administrador ya existe');
    }
  } catch (error) {
    console.error('Error al crear el administrador:', error);
  }
};

createAdmin();
