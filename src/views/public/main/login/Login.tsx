import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/UserContext/UserContext';
import { TSignIn } from '../../../../models/types/requests/TSignIn';
import { FaRegUser, FaLock, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./Login.css"

const Login: React.FC = () => {
  const [formData, setFormData] = useState<TSignIn>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Resetear el mensaje de error antes de intentar iniciar sesión
    const success = await login(formData);
    if (success) {
      if (user?.rolUsuario === 'Paciente') {
        navigate('/PageWelcome');
      } else if (user?.rolUsuario === 'Medico') {
        navigate('/AppointmentListDoctor');
      }
    } else {
      setErrorMessage('Usuario y/o contraseña incorrectos');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className='login-view'>
      <div className='principal-box'>
        <div className='form-div'>
          <form onSubmit={handleSubmit}>
            <h1 className='title'>Bienvenido al Sistema Integral de AlMedin Obra Social</h1>
            <p className='description'>Ingresa tus datos para continuar</p>
            <label className='label'>Correo electrónico</label>
            <div className='input-container'>
              <FaRegUser className='icon' />
              <input
                className='input'
                type="text"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <label className='label'>Contraseña</label>
            <div className='input-container'>
              <FaLock className='icon' />
              <input
                className='input'
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              {showPassword ? (
                <FaRegEye className='icon-view-pass' onClick={handleTogglePasswordVisibility} />
              ) : (
                <FaRegEyeSlash className='icon-view-pass' onClick={handleTogglePasswordVisibility} />
              )}
            </div>
            {errorMessage && <p className='error-message'>{errorMessage}</p>} {/* Mostrar el mensaje de error si existe */}
            <Link className='forgot-password-link' to="/forgot-password">¿Olvidaste usuario y/o contraseña?</Link>
            <button className='button' type="submit">Iniciar sesión</button>
            <Link to="/register">
              <button className='button'>Crear cuenta</button>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
