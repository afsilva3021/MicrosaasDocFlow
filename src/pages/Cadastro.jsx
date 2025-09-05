// src/pages/Cadastro.jsx
import { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert,
    InputGroup,
    Modal
} from 'react-bootstrap';
import {
    Envelope,
    Lock,
    Eye,
    EyeSlash,
    ArrowLeft,
    Google,
    Person,
    Phone,
    Building,
    CheckCircle
} from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
// import { supabase } from '../lib/supabase';
import './Cadastro.css';

function Cadastro() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        password: '',
        confirmPassword: '',
        termos: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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

        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome completo é obrigatório';
        }

        if (!formData.email) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
        }

        if (!formData.termos) {
            newErrors.termos = 'Você deve aceitar os termos de uso';
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
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        nome: formData.nome,
                        telefone: formData.telefone,
                        empresa: formData.empresa,
                        tipo: 'email'
                    }
                }
            });

            if (error) throw error;

            setShowSuccessModal(true);

        } catch (error) {
            setAlertMessage(error.message || 'Erro ao criar conta');
            setShowAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setIsGoogleLoading(true);
        setShowAlert(false);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/dashboard`
                }
            });

            if (error) throw error;

        } catch (error) {
            setAlertMessage(error.message || 'Erro ao conectar com Google');
            setShowAlert(true);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="cadastro-page">
            <div className="cadastro-background"></div>

            <Container fluid>
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                        {/* Botão Voltar */}
                        <Button
                            variant="outline-light"
                            className="back-btn mb-4 d-flex align-items-center"
                            as={Link} to="/" // ← Redirecionamento direto
                        >
                            <ArrowLeft className="me-2" />
                            Voltar para o site
                        </Button>

                        <Card className="cadastro-card">
                            <Card.Body className="p-5">
                                {/* Logo e Título */}
                                <div className="text-center mb-4">
                                    <div className="cadastro-logo mb-3">
                                        <span className="cadastro-logo-text">DF</span>
                                    </div>
                                    <h2 className="fw-bold text-primary mb-2">Criar Conta</h2>
                                    <p className="text-muted">Junte-se ao DocFlow e simplifique seus documentos</p>
                                </div>

                                {/* Alert de erro */}
                                {showAlert && (
                                    <Alert variant="danger" className="cadastro-alert mb-4">
                                        <strong>Erro!</strong> {alertMessage}
                                    </Alert>
                                )}

                                {/* Botão Google */}
                                <Button
                                    variant="outline-secondary"
                                    className="w-100 py-2 mb-4 d-flex align-items-center justify-content-center"
                                    onClick={handleGoogleSignUp}
                                    disabled={isGoogleLoading}
                                >
                                    {isGoogleLoading ? (
                                        <span className="spinner-border spinner-border-sm me-2" />
                                    ) : (
                                        <Google className="me-2" size={20} />
                                    )}
                                    Cadastrar com Google
                                </Button>

                                {/* Divisor */}
                                <div className="divider mb-4">
                                    <span>ou cadastre com email</span>
                                </div>

                                {/* Formulário de Cadastro */}
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-semibold">Nome Completo *</Form.Label>
                                                <InputGroup className="cadastro-input-group">
                                                    <InputGroup.Text>
                                                        <Person />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        type="text"
                                                        name="nome"
                                                        placeholder="Seu nome completo"
                                                        value={formData.nome}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.nome}
                                                        disabled={isLoading}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.nome}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-semibold">Telefone</Form.Label>
                                                <InputGroup className="cadastro-input-group">
                                                    <InputGroup.Text>
                                                        <Phone />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        type="tel"
                                                        name="telefone"
                                                        placeholder="(11) 99999-9999"
                                                        value={formData.telefone}
                                                        onChange={handleChange}
                                                        disabled={isLoading}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Empresa</Form.Label>
                                        <InputGroup className="cadastro-input-group">
                                            <InputGroup.Text>
                                                <Building />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                name="empresa"
                                                placeholder="Nome da sua empresa (opcional)"
                                                value={formData.empresa}
                                                onChange={handleChange}
                                                disabled={isLoading}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Email *</Form.Label>
                                        <InputGroup className="cadastro-input-group">
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

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-semibold">Senha *</Form.Label>
                                                <InputGroup className="cadastro-input-group">
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
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-semibold">Confirmar Senha *</Form.Label>
                                                <InputGroup className="cadastro-input-group">
                                                    <InputGroup.Text>
                                                        <Lock />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        name="confirmPassword"
                                                        placeholder="Confirme sua senha"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.confirmPassword}
                                                        disabled={isLoading}
                                                    />
                                                    <InputGroup.Text
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {showConfirmPassword ? <EyeSlash /> : <Eye />}
                                                    </InputGroup.Text>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.confirmPassword}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-4">
                                        <Form.Check
                                            type="checkbox"
                                            name="termos"
                                            label={
                                                <span>
                                                    Aceito os{' '}
                                                    <Link to="/termos" className="text-decoration-none">
                                                        Termos de Uso
                                                    </Link>{' '}
                                                    e{' '}
                                                    <Link to="/privacidade" className="text-decoration-none">
                                                        Política de Privacidade
                                                    </Link>
                                                </span>
                                            }
                                            checked={formData.termos}
                                            onChange={handleChange}
                                            isInvalid={!!errors.termos}
                                            disabled={isLoading}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.termos}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="cadastro-btn w-100 py-3 mb-3 fw-semibold"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" />
                                                Criando conta...
                                            </>
                                        ) : (
                                            'Criar Minha Conta'
                                        )}
                                    </Button>
                                </Form>

                                {/* Link para Login */}
                                <div className="text-center">
                                    <p className="text-muted mb-0">
                                        Já tem uma conta?{' '}
                                        <Link
                                            to="/login"
                                            className="cadastro-link fw-semibold"
                                        >
                                            Fazer login
                                        </Link>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Footer */}
                        <div className="text-center mt-4">
                            <p className="text-white small mb-0">
                                © 2024 DocFlow. Todos os direitos reservados.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Modal de Sucesso */}
            <Modal show={showSuccessModal} centered onHide={() => setShowSuccessModal(false)}>
                <Modal.Body className="text-center p-5">
                    <CheckCircle size={48} className="text-success mb-3" />
                    <h4 className="fw-bold mb-3">Conta Criada com Sucesso!</h4>
                    <p className="text-muted mb-4">
                        Enviamos um email de confirmação para <strong>{formData.email}</strong>.
                        Verifique sua caixa de entrada para ativar sua conta.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShowSuccessModal(false);
                            navigate('/login');
                        }}
                    >
                        Fazer Login
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Cadastro;
