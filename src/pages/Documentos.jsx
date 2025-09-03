import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Table, Dropdown, Modal } from 'react-bootstrap';
import {
    Search,
    Filter,
    SortDown,
    FileEarmarkText,
    Eye,
    Share,
    Download,
    Trash,
    ThreeDotsVertical,
    PlusCircle,
    Clock,
    CheckCircle,
    XCircle,
    Person,
    Calendar
} from 'react-bootstrap-icons';
import { useState } from 'react';

function Documentos() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('todos');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState(null);

    // Dados de exemplo para os documentos
    const documentos = [
        {
            id: 1,
            titulo: 'Contrato de Prestação de Serviços - Cliente A',
            tipo: 'Contrato',
            status: 'assinado',
            dataCriacao: '2024-01-15',
            dataVencimento: '2025-01-15',
            participantes: 2,
            dono: 'Você',
            icone: <FileEarmarkText size={20} className="text-primary" />
        },
        {
            id: 2,
            titulo: 'NDA - Parceiro Comercial B',
            tipo: 'NDA',
            status: 'pendente',
            dataCriacao: '2024-01-10',
            dataVencimento: '2024-07-10',
            participantes: 3,
            dono: 'Você',
            icone: <FileEarmarkText size={20} className="text-success" />
        },
        {
            id: 3,
            titulo: 'Contrato de Trabalho - Funcionário C',
            tipo: 'Contrato Trabalho',
            status: 'rascunho',
            dataCriacao: '2024-01-08',
            dataVencimento: null,
            participantes: 1,
            dono: 'Você',
            icone: <FileEarmarkText size={20} className="text-warning" />
        },
        {
            id: 4,
            titulo: 'Proposta Comercial - Empresa D',
            tipo: 'Proposta',
            status: 'assinado',
            dataCriacao: '2024-01-05',
            dataVencimento: null,
            participantes: 2,
            dono: 'Você',
            icone: <FileEarmarkText size={20} className="text-info" />
        },
        {
            id: 5,
            titulo: 'Termo de Confidencialidade - Fornecedor E',
            tipo: 'NDA',
            status: 'expirado',
            dataCriacao: '2023-06-20',
            dataVencimento: '2023-12-20',
            participantes: 2,
            dono: 'Você',
            icone: <FileEarmarkText size={20} className="text-danger" />
        }
    ];

    const statusOptions = [
        { value: 'todos', label: 'Todos os Status' },
        { value: 'assinado', label: 'Assinado' },
        { value: 'pendente', label: 'Pendente' },
        { value: 'rascunho', label: 'Rascunho' },
        { value: 'expirado', label: 'Expirado' }
    ];

    const filteredDocumentos = documentos.filter(documento => {
        const matchesSearch = documento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            documento.tipo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'todos' || documento.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const variants = {
            assinado: { bg: 'success', text: 'Assinado', icon: <CheckCircle size={14} className="me-1" /> },
            pendente: { bg: 'warning', text: 'Pendente', icon: <Clock size={14} className="me-1" /> },
            rascunho: { bg: 'secondary', text: 'Rascunho', icon: <FileEarmarkText size={14} className="me-1" /> },
            expirado: { bg: 'danger', text: 'Expirado', icon: <XCircle size={14} className="me-1" /> }
        };
        const statusInfo = variants[status] || variants.rascunho;

        return (
            <Badge bg={statusInfo.bg} className="d-flex align-items-center">
                {statusInfo.icon}
                {statusInfo.text}
            </Badge>
        );
    };

    const handleDeleteClick = (documento) => {
        setDocumentToDelete(documento);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        // Lógica para deletar o documento
        console.log('Deletando documento:', documentToDelete);
        setShowDeleteModal(false);
        setDocumentToDelete(null);
    };

    return (
        <>
            {/* Header */}
            <Container className="my-4">
                <Row className="align-items-center">
                    <Col>
                        <h1 className="h2 fw-bold text-primary mb-0">Meus Documentos</h1>
                        <p className="text-muted">Gerencie todos os seus contratos e documentos</p>
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" className="d-flex align-items-center">
                            <PlusCircle className="me-2" />
                            Novo Documento
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Filtros e Busca */}
            <Container className="mb-4">
                <Row className="g-3">
                    <Col md={8}>
                        <InputGroup>
                            <InputGroup.Text>
                                <Search />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Buscar documentos por título ou tipo..."
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
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>

            {/* Lista de Documentos */}
            <Container>
                {filteredDocumentos.length > 0 ? (
                    <Card className="border-0 shadow-sm">
                        <Table responsive hover className="mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th>Documento</th>
                                    <th>Status</th>
                                    <th>Data Criação</th>
                                    <th>Vencimento</th>
                                    <th>Participantes</th>
                                    <th width="100">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDocumentos.map(documento => (
                                    <tr key={documento.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-light rounded-circle p-2 me-3">
                                                    {documento.icone}
                                                </div>
                                                <div>
                                                    <div className="fw-semibold">{documento.titulo}</div>
                                                    <small className="text-muted">{documento.tipo}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {getStatusBadge(documento.status)}
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <Calendar size={14} className="text-muted me-2" />
                                                {new Date(documento.dataCriacao).toLocaleDateString('pt-BR')}
                                            </div>
                                        </td>
                                        <td>
                                            {documento.dataVencimento ? (
                                                <div className="d-flex align-items-center">
                                                    <Clock size={14} className="text-muted me-2" />
                                                    {new Date(documento.dataVencimento).toLocaleDateString('pt-BR')}
                                                </div>
                                            ) : (
                                                <span className="text-muted">-</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <Person size={14} className="text-muted me-2" />
                                                {documento.participantes}
                                            </div>
                                        </td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="light" size="sm" id="dropdown-actions">
                                                    <ThreeDotsVertical />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        <Eye className="me-2" />
                                                        Visualizar
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <Share className="me-2" />
                                                        Compartilhar
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <Download className="me-2" />
                                                        Download
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item
                                                        className="text-danger"
                                                        onClick={() => handleDeleteClick(documento)}
                                                    >
                                                        <Trash className="me-2" />
                                                        Excluir
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                ) : (
                    <Card className="text-center py-5 border-0">
                        <FileEarmarkText size={48} className="text-muted mb-3" />
                        <h5 className="text-muted">Nenhum documento encontrado</h5>
                        <p className="text-muted mb-4">Tente ajustar os filtros de busca</p>
                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedStatus('todos');
                            }}
                        >
                            Limpar Filtros
                        </Button>
                    </Card>
                )}
            </Container>

            {/* Modal de Confirmação de Exclusão */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {documentToDelete && (
                        <>
                            <p>Tem certeza que deseja excluir o documento:</p>
                            <p className="fw-bold">"{documentToDelete.titulo}"?</p>
                            <p className="text-muted">Esta ação não pode ser desfeita.</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        <Trash className="me-2" />
                        Excluir Documento
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Estatísticas Rápidas */}
            <Container className="my-5">
                <Row>
                    <Col md={3} className="text-center">
                        <Card className="border-0 bg-light-primary">
                            <Card.Body>
                                <FileEarmarkText size={32} className="text-primary mb-2" />
                                <h4 className="fw-bold">{documentos.length}</h4>
                                <p className="text-muted mb-0">Total de Documentos</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="text-center">
                        <Card className="border-0 bg-light-success">
                            <Card.Body>
                                <CheckCircle size={32} className="text-success mb-2" />
                                <h4 className="fw-bold">{documentos.filter(d => d.status === 'assinado').length}</h4>
                                <p className="text-muted mb-0">Assinados</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="text-center">
                        <Card className="border-0 bg-light-warning">
                            <Card.Body>
                                <Clock size={32} className="text-warning mb-2" />
                                <h4 className="fw-bold">{documentos.filter(d => d.status === 'pendente').length}</h4>
                                <p className="text-muted mb-0">Pendentes</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="text-center">
                        <Card className="border-0 bg-light-danger">
                            <Card.Body>
                                <XCircle size={32} className="text-danger mb-2" />
                                <h4 className="fw-bold">{documentos.filter(d => d.status === 'expirado').length}</h4>
                                <p className="text-muted mb-0">Expirados</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Documentos;