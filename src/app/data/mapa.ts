export const MAPA_SHEET_DATA = {
    id: '1',
    titulo: 'Igreja Matriz',
    endereco: 'Praça da Independência - Espirito Santo do Pinhal, SP',
    latitude: -46.74684587373476,
    longitude: -22.193703351116405,
    image: 'https://placehold.co/400/png',
    distancia: 500,
    estrelas: 4.5,
    descricao: 'A Igreja Matriz de Espírito Santo do Pinhal, dedicada a Divino Espírito Santo, é um marco histórico e arquitetônico na cidade. Sua construção imponente e detalhes artísticos a tornam um ponto de referência e visita obrigatória. O interior da igreja abriga belos altares, vitrais coloridos e obras sacras que contam a história da fé e da comunidade local. Além de seu valor religioso, a Igreja Matriz é um importante patrimônio cultural, palco de celebrações e eventos que reúnem os moradores e visitantes.',
    avaliacoes: [
        {
            nome: 'Ana Silva',
            avaliacao: 4,
            comentario: 'Linda igreja, muito bem conservada e com uma energia incrível. Vale a pena a visita!',
            data: '2023-10-26'
        },
        {
            nome: 'Carlos Oliveira',
            avaliacao: 5,
            comentario: 'Arquitetura impressionante e um lugar de muita paz. Recomendo a todos que visitarem Pinhal.',
            data: '2023-10-25'
        },
        {
            nome: 'Beatriz Costa',
            avaliacao: 4,
            comentario: 'Um pouco antiga, mas com muitos detalhes interessantes. Gostei da visita guiada.',
            data: '2023-10-24'
        },
        {
            nome: 'Fernando Rocha',
            avaliacao: 3,
            comentario: 'Bonita, mas esperava mais da parte interna. A praça ao redor é agradável.',
            data: '2023-10-23'
        },
        {
            nome: 'Mariana Santos',
            avaliacao: 4,
            comentario: 'Chique, muito xique xique bahia',
            data: '2023-10-22'
        },
        {
            nome: 'Xeila de Oliveira',
            avaliacao: 5,
            comentario: 'Achei muito é massa',
            data: '2023-10-21'
        },
        {
            nome: 'Pardo Xande',
            avaliacao: 4,
            comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit. A lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
            data: '2023-10-20'
        }
    ]
}

export const pontosTuristicos = [
    {
        id: 1,
        nome: 'Igreja Matriz',
        descricao: 'Uma bela igreja histórica no centro da cidade.',
        coordenadas: [-46.74681904570734, -22.193903727089243], // Exemplo de coordenadas (longitude, latitude)
        imagem: require('../../../assets/images/imagesMapMarker/IgrejaMatriz.jpg'), // Substitua pelo caminho da imagem local
    },
    {
        id: 2,
        nome: 'Museu da Cidade',
        descricao: 'Um museu que conta a história da cidade.',
        coordenadas: [-46.748, -22.195], // Exemplo de coordenadas (longitude, latitude)
        imagem: require('../../../assets/images/imagesMapMarker/MuseuCidade.jpg'), // Substitua pelo caminho da imagem local
    },
    {
        id: 3,
        nome: 'Praça da Independência',
        descricao: 'Uma praça histórica onde ocorreram eventos importantes.',
        coordenadas: [-46.749, -22.194], // Exemplo de coordenadas (longitude, latitude)
        imagem: require('../../../assets/images/imagesMapMarker/PracaIndependencia.jpg'), // Substitua pelo caminho da imagem local
    },
    {
        id: 4,
        nome: 'Palacio do Café',
        descricao: 'Um palácio histórico que remonta à era do café.',
        coordenadas: [-46.750, -22.196], // Exemplo de coordenadas (longitude, latitude)
        imagem: require('../../../assets/images/imagesMapMarker/PalacioCafe.jpg'), // Substitua pelo caminho da imagem local
    },
    {
        id: 5,
        nome: 'Cânara Municipal',
        descricao: 'A sede do governo local com arquitetura impressionante.',
        coordenadas: [-46.751, -22.193], // Exemplo de coordenadas (longitude, latitude)
        imagem: require('../../../assets/images/imagesMapMarker/CamaraMunicipal.jpg'), // Substitua pelo caminho da imagem local
    },
    {
        id: 6,
        nome: 'Cine Theatro Avenida',
        descricao: 'Um teatro histórico que exibe filmes clássicos e peças teatrais.',
        coordenadas: [-46.752, -22.197], // Exemplo de coordenadas (longitude, latitude)
        imagem: require('../../../assets/images/imagesMapMarker/CineTheatroAvenida.jpg'), // Substitua pelo caminho da imagem local
    },
    {
        id: 7,
        nome: 'Cia da Hebe',
        descricao: 'peça central na história de Espírito Santo do Pinhal. Construído em 1903, a princípio como residência, o casarão abrigou setores municipais e o primeiro cartório da comarca.',
        coordenadas: [-46.753, -22.198], // Exemplo de coordenadas (longitude, latitude)
        imagem: require('../../../assets/images/imagesMapMarker/CiaHebe.jpg'), // Substitua pelo caminho da imagem local
    },
]