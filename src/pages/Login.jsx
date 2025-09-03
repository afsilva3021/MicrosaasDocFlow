// src/pages/Login.jsx
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { 
  Envelope, 
  Lock, 
  Eye, 
  EyeSlash,
  ArrowLeft
} from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setShowAlert(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login realizado:', formData.email);
      navigate('/');
    } catch (error) {
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            {/* Botão Voltar */}
            <Button 
              variant="outline-light" 
              className="mb-4 d-flex align-items-center"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="me-2" />
              Voltar para o site
            </Button>

            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                {/* Logo e Título - SEM FileEarmarkText */}
                <div className="text-center mb-4">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3" 
                       style={{ width: '80px', height: '80px' }}>
                    <span style={{ fontSize: '24px', color: 'white', fontWeight: 'bold' }}>DF</span>
                  </div>
                  <h2 className="fw-bold text-primary mb-2">Bem-vindo ao DocFlow</h2>
                  <p className="text-muted">Faça login para acessar sua conta</p>
                </div>

                {/* Alert de erro */}
                {showAlert && (
                  <Alert variant="danger" className="mb-3">
                    <strong>Erro!</strong> Email ou senha incorretos.
                  </Alert>
                )}

                {/* Formulário de Login */}
                <Form onSubmit={handleSubmit}>
                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <Envelope />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        disabled={isLoading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {/* Senha */}
                  <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <Lock />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Sua senha"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        disabled={isLoading}
                      />
                      <InputGroup.Text 
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeSlash /> : <Eye />}
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {/* Lembrar de mim e Esqueci a senha */}
                  <Row className="mb-3">
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="Lembrar de mim"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={isLoading}
                      />
                    </Col>
                    <Col className="text-end">
                      <Link 
                        to="/esqueci-senha" 
                        className="text-decoration-none text-primary small"
                      >
                        Esqueci a senha
                      </Link>
                    </Col>
                  </Row>

                  {/* Botão de Login */}
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 mb-3 fw-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                </Form>

                {/* Link para Cadastro */}
                <div className="text-center">
                  <p className="text-muted mb-0">
                    Não tem uma conta?{' '}
                    <Link 
                      to="/cadastro" 
                      className="text-decoration-none fw-semibold text-primary"
                    >
                      Cadastre-se
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Footer */}
            <div className="text-center mt-3">
              <p className="text-white small mb-0">
                © 2024 DocFlow. Todos os direitos reservados.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;