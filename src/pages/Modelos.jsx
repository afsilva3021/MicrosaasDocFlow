// src/pages/Modelos.jsx
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Breadcrumb } from 'react-bootstrap';
import {
  Search,
  FileEarmarkText,
  Clock,
  Download,
  Eye,
  PlusCircle,
  StarFill,
  Person,
  Building,
  FileCheck,
  Filter,
  SortDown
} from 'react-bootstrap-icons';
import { useState } from 'react';

function Modelos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Dados de exemplo para os modelos
  const templates = [
    {
      id: 1,
      title: 'Contrato de Prestação de Serviços',
      description: 'Modelo ideal para freelancers e empresas que contratam serviços tercerizados.',
      category: 'freelancer',
      uses: 1247,
      rating: 4.8,
      price: 'Gratuito',
      icon: <FileEarmarkText size={24} className="text-primary" />,
      popular: true
    },
    {
      id: 2,
      title: 'Contrato de Confidencialidade (NDA)',
      description: 'Proteja informações confidenciais em negociações e parcerias comerciais.',
      category: 'empresarial',
      uses: 892,
      rating: 4.7,
      price: 'Gratuito',
      icon: <FileCheck size={24} className="text-success" />,
      popular: true
    },
    {
      id: 3,
      title: 'Contrato de Trabalho CLT',
      description: 'Modelo completo para contratação de funcionários sob o regime CLT.',
      category: 'rh',
      uses: 1563,
      rating: 4.9,
      price: 'Premium',
      icon: <Building size={24} className="text-warning" />,
      popular: false
    },
    {
      id: 4,
      title: 'Contrato de Locação Residencial',
      description: 'Para proprietários e inquilinos, com todas as cláusulas necessárias.',
      category: 'imobiliario',
      uses: 734,
      rating: 4.6,
      price: 'Gratuito',
      icon: <Person size={24} className="text-info" />,
      popular: false
    },
    {
      id: 5,
      title: 'Termo de Adesão',
      description: 'Para serviços recorrentes como assinaturas e serviços online.',
      category: 'empresarial',
      uses: 567,
      rating: 4.5,
      price: 'Premium',
      icon: <FileCheck size={24} className="text-success" />,
      popular: true
    },
    {
      id: 6,
      title: 'Contrato de Parceria Comercial',
      description: 'Ideal para joint ventures e parcerias estratégicas entre empresas.',
      category: 'empresarial',
      uses: 423,
      rating: 4.8,
      price: 'Premium',
      icon: <Building size={24} className="text-warning" />,
      popular: false
    }
  ];

  const categories = [
    { value: 'todos', label: 'Todos os Modelos' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'empresarial', label: 'Empresarial' },
    { value: 'rh', label: 'Recursos Humanos' },
    { value: 'imobiliario', label: 'Imobiliário' },
    { value: 'outros', label: 'Outros' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Breadcrumb */}
      <Container className="mt-4">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Início</Breadcrumb.Item>
          <Breadcrumb.Item active>Modelos</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      {/* Header */}
      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h1 className="display-4 fw-bold text-primary mb-3">Modelos de Documentos</h1>
            <p className="lead text-muted">
              Escolha entre nossos modelos profissionais prontos ou crie os seus próprios
            </p>
          </Col>
        </Row>
      </Container>

      {/* Filtros e Busca */}
      <Container className="mb-5">
        <Row className="g-3">
          <Col md={8}>
            <InputGroup>
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar modelos por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>
                <Filter />
              </InputGroup.Text>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      {/* Grid de Modelos */}
      <Container>
        <Row className="g-4">
          {filteredTemplates.map(template => (
            <Col key={template.id} lg={4} md={6}>
              <Card className="h-100 shadow-sm border-0 hover-shadow">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="bg-light rounded-circle p-3">
                      {template.icon}
                    </div>
                    {template.popular && (
                      <Badge bg="warning" text="dark">
                        Popular
                      </Badge>
                    )}
                  </div>

                  <Card.Title className="h5">{template.title}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">
                    {template.description}
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Badge
                      bg={template.price === 'Gratuito' ? 'success' : 'primary'}
                      className="px-2 py-1"
                    >
                      {template.price}
                    </Badge>
                    <small className="text-muted">
                      <Download className="me-1" />
                      {template.uses} usos
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <StarFill className="text-warning me-1" />
                      <small>{template.rating}</small>
                    </div>
                    <small className="text-muted">
                      <Clock className="me-1" />
                      Última atualização: 12/2024
                    </small>
                  </div>

                  <div className="d-grid gap-2">
                    <Button variant="primary" className="d-flex align-items-center justify-content-center">
                      <Eye className="me-2" />
                      Visualizar Modelo
                    </Button>
                    <Button variant="outline-primary">
                      Usar este Modelo
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <Row className="text-center py-5">
            <Col>
              <FileEarmarkText size={64} className="text-muted mb-3" />
              <h4 className="text-muted">Nenhum modelo encontrado</h4>
              <p className="text-muted">Tente ajustar os filtros ou termos de busca</p>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todos');
                }}
              >
                Limpar Filtros
              </Button>
            </Col>
          </Row>
        )}
      </Container>

      {/* CTA Section */}
      <Container className="my-5 py-5">
        <Row className="text-center">
          <Col lg={8} className="mx-auto">
            <div className="bg-light rounded-3 p-5">
              <PlusCircle size={48} className="text-primary mb-3" />
              <h3>Não encontrou o que procurava?</h3>
              <p className="text-muted mb-4">
                Crie seu próprio modelo personalizado do zero ou solicite um modelo específico
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Button variant="primary" size="lg">
                  Criar Modelo Personalizado
                </Button>
                <Button variant="outline-primary" size="lg">
                  Solicitar Modelo
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Modelos;