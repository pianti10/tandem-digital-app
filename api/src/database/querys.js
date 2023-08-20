

module.exports = {
    getAllUsers: 'SELECT * FROM Users',
    createNewUser: 'INSERT INTO Users (nombre, apellido, email, telefono, usuario, contraseña) VALUES (@nombre, @apellido, @email, @telefono, @usuario, @contraseña)',
    getUserById: 'SELECT * FROM Users where Id = @Id',
    deleteUserById: 'DELETE FROM [tandemDigitalTest].[dbo].[Users] WHERE Id = @Id',
    updateUserById: 'UPDATE Users SET nombre = @nombre, apellido = @apellido, email = @email, telefono = @telefono, usuario = @usuario, contraseña = @contraseña WHERE Id = @Id',
}