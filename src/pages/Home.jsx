// src/pages/Home.jsx
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import {
    ArrowRight,
    CheckCircle,
    FileText,
    Send,
    Clock,
    Shield,
    StarFill,
    PersonCircle
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            {/* === SEÇÃO HERÓI === */}
            <section className="bg-primary text-white py-5">
                <Container>
                    <Row className="align-items-center" style={{ minHeight: '500px' }}>
                        <Col lg={6}>
                            <Badge bg="light" text="dark" className="mb-3 fs-6">🚀 NOVO</Badge>
                            <h1 className="display-4 fw-bold mb-3">
                                Crie, envie e assine contratos em minutos
                            </h1>
                            <p className="lead mb-4 fs-5">
                                O DocFlow automatiza toda a gestão dos seus documentos jurídicos.
                                Diga adeus à papelada e aos emails perdidos.
                            </p>
                            <div className="d-flex gap-3 flex-wrap">
                                <Button variant="light" size="lg" className="rounded-pill px-4 py-2">
                                    Começar Gratuitamente <ArrowRight className="ms-2" />
                                </Button>
                                <Button 
                                    variant="outline-light" 
                                    size="lg" 
                                    className="rounded-pill px-4 py-2" 
                                   as={Link} to="/documentos">
                                    Ver Demonstração
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6} className="text-center">
                            <div className="bg-white rounded-3 p-5 shadow">
                                <FileText size={100} className="text-primary mb-3" />
                                <p className="text-muted mb-0 fs-6">Dashboard ilustrativo do DocFlow</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* === SEÇÃO BENEFÍCIOS === */}
            <section className="py-5">
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="fw-bold display-5 mb-3">Por que escolher o DocFlow?</h2>
                            <p className="text-muted fs-5">Tudo que você precisa para gerenciar contratos com eficiência</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="text-center mb-4">
                            <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                                <Clock size={40} className="text-primary" />
                            </div>
                            <h4 className="mb-3">Economize Tempo</h4>
                            <p className="text-muted">
                                Reduza em 80% o tempo gasto com criação, revisão e aprovação de documentos.
                            </p>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                                <Send size={40} className="text-primary" />
                            </div>
                            <h4 className="mb-3">Assinatura Simplificada</h4>
                            <p className="text-muted">
                                Envie para assinatura com um link. Assinatura eletrônica com validade jurídica.
                            </p>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                                <Shield size={40} className="text-primary" />
                            </div>
                            <h4 className="mb-3">Segurança Máxima</h4>
                            <p className="text-muted">
                                Seus documentos protegidos com criptografia de ponta a ponta.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* === SEÇÃO COMO FUNCIONA === */}
            <section className="bg-light py-5">
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="fw-bold display-5 mb-3">Como funciona</h2>
                            <p className="text-muted fs-5">Três passos simples para revolucionar seus contratos</p>
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col md={4} className="text-center">
                            <div className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-4"
                                style={{ width: '80px', height: '80px' }}>
                                <strong className="fs-3">1</strong>
                            </div>
                            <h4 className="mb-3">Escolha um modelo</h4>
                            <p className="text-muted">
                                Selecione entre nossos modelos prontos ou crie os seus próprios.
                            </p>
                        </Col>
                        <Col md={4} className="text-center">
                            <div className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-4"
                                style={{ width: '80px', height: '80px' }}>
                                <strong className="fs-3">2</strong>
                            </div>
                            <h4 className="mb-3">Personalize o documento</h4>
                            <p className="text-muted">
                                Preencha os campos variáveis com nossas ferramentas intuitivas.
                            </p>
                        </Col>
                        <Col md={4} className="text-center">
                            <div className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-4"
                                style={{ width: '80px', height: '80px' }}>
                                <strong className="fs-3">3</strong>
                            </div>
                            <h4 className="mb-3">Envie para assinatura</h4>
                            <p className="text-muted">
                                Compartilhe o link e acompanhe o status em tempo real.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* === SEÇÃO DEPOIMENTOS === */}
            <section className="py-5">
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="fw-bold display-5 mb-3">O que nossos clientes dizem</h2>
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow">
                                <Card.Body className="p-4">
                                    <div className="d-flex mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <StarFill key={i} className="text-warning me-1" size={20} />
                                        ))}
                                    </div>
                                    <Card.Text className="text-muted fs-6">
                                        "O DocFlow transformou como minha equipe lida com contratos.
                                        O tempo de fechamento caiu pela metade e a organização é incomparável."
                                    </Card.Text>
                                    <div className="d-flex align-items-center mt-4">
                                        <PersonCircle size={40} className="text-primary me-3" />
                                        <div>
                                            <strong className="d-block">Carlos Silva</strong>
                                            <small className="text-muted">Diretor Jurídico</small>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow">
                                <Card.Body className="p-4">
                                    <div className="d-flex mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <StarFill key={i} className="text-warning me-1" size={20} />
                                        ))}
                                    </div>
                                    <Card.Text className="text-muted fs-6">
                                        "Como freelancer, ter contratos profissionais e de fácil assinatura
                                        fez toda a diferença na minha credibilidade e eficiência."
                                    </Card.Text>
                                    <div className="d-flex align-items-center mt-4">
                                        <PersonCircle size={40} className="text-primary me-3" />
                                        <div>
                                            <strong className="d-block">Ana Santos</strong>
                                            <small className="text-muted">Designer Freelancer</small>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* === SEÇÃO CHAMADA PARA AÇÃO === */}
            <section className="bg-primary text-white py-5">
                <Container>
                    <Row className="text-center">
                        <Col>
                            <h2 className="fw-bold mb-4 display-5">Pronto para simplificar seus contratos?</h2>
                            <p className="lead mb-4 fs-4">Junte-se a milhares de profissionais que já usam o DocFlow</p>
                            <Button variant="light" size="lg" className="rounded-pill px-5 py-3 mb-3">
                                Começar Agora - Grátis
                            </Button>
                            <p className="mb-0 fs-6">
                                <CheckCircle className="me-2" />
                                Não é necessário cartão de crédito
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Home;