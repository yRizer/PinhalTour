const BASE_URL = 'https://backend-tcc-production-9d24.up.railway.app';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = BASE_URL;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`Conectando ao Railway: ${url}`);
      
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout da requisição')), 15000);
      });
      
      const fetchPromise = fetch(url, defaultOptions);
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✓ Conexão bem-sucedida com Railway');
      console.log('Resposta da API:', data);
      
      return data;
    } catch (error) {
      console.error(`✗ Erro ao conectar no Railway:`, error);
      throw error instanceof Error ? error : new Error('Falha na conexão com o servidor');
    }
  }

  async getQRInfo(qrCode: string) {
    return this.makeRequest(`/qr-info/${qrCode}`);
  }

  async get(endpoint: string) {
    return this.makeRequest(endpoint);
  }

  async post(endpoint: string, data: any) {
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.makeRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.makeRequest(endpoint, {
      method: 'DELETE',
    });
  }

  async patch(endpoint: string, data: any) {
    return this.makeRequest(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async register(nome: string, email: string, senha: string, telefone?: string) {
    return this.post('/auth/register', { nome, email, senha, telefone });
  }

  async login(email: string, senha: string) {
    return this.post('/auth/login', { email, senha });
  }

  async getUserById(id: number) {
    return this.get(`/auth/user/${id}`);
  }

  async updateUser(id: number, nome: string, telefone?: string) {
    return this.put(`/auth/user/${id}`, { nome, telefone });
  }

  async createReservation(reservaData: {
    usuario_id: number;
    nome_cliente: string;
    email_cliente: string;
    telefone_cliente: string;
    data_visita: string;
    horario_visita: string;
    numero_visitantes: number;
    tipo_tour: string;
    observacoes?: string;
  }) {
    return this.post('/reservations', reservaData);
  }

  /**
   * Busca reservas de um usuário
   */
  async getUserReservations(usuario_id: number) {
    return this.get(`/reservations/user/${usuario_id}`);
  }

  /**
   * Busca uma reserva específica
   */
  async getReservationById(id: number) {
    return this.get(`/reservations/${id}`);
  }

  /**
   * Verifica disponibilidade de horário
   */
  async checkAvailability(data: string, horario: string) {
    return this.get(`/reservations/check-availability/${data}/${horario}`);
  }

  /**
   * Atualiza status de uma reserva
   */
  async updateReservationStatus(id: number, status: string) {
    return this.patch(`/reservations/${id}/status`, { status });
  }

  async updateReservation(id: number, reservaData: any) {
    return this.put(`/reservations/${id}`, reservaData);
  }

  async deleteReservation(id: number) {
    return this.delete(`/reservations/${id}`);
  }
}

const apiService = new ApiService();

export default apiService;