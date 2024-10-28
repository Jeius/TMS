'use server'

import { Thesis } from '@/lib/types';

export async function getTheses(): Promise<Thesis[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
        {
            id: '1',
            title: 'A Study on Quantum Computing Applications',
            year: 2023,
            author: 'Smith, A.; Johnson, B.',
            adviser: 'Clark, E.',
            keywords: 'quantum computing, applications, research',
            specialization: 'Computer Science',
            dateUploaded: '01/10/2024',
            department: 'Information Technology Department'
        },
        {
            id: '2',
            title: 'Advancements in Artificial Intelligence',
            year: 2022,
            author: 'Brown, C.',
            adviser: 'Davis, S.',
            keywords: 'artificial intelligence, machine learning, technology',
            specialization: 'Computer Science, AI',
            dateUploaded: '05/22/2023',
            department: 'Computer Applications Department'
        },
        {
            id: '3',
            title: 'Exploring Sustainable Energy Solutions',
            year: 2021,
            author: 'Lee, D.; Martinez, E.',
            adviser: 'Wilson, M.',
            keywords: 'sustainable energy, renewable resources, environment',
            specialization: 'Environmental Science',
            dateUploaded: '07/30/2022',
            department: 'Information Technology Department'
        },
        {
            id: '4',
            title: 'Impact of Social Media on Modern Communication',
            year: 2023,
            author: 'Harris, F.',
            adviser: 'Anderson, J.',
            keywords: 'social media, communication, impact',
            specialization: 'Communication Studies',
            dateUploaded: '03/15/2024',
            department: 'Information Systems Department'
        },
        {
            id: '5',
            title: 'Blockchain Technology and Its Potential',
            year: 2020,
            author: 'Thompson, G.',
            adviser: 'White, L.',
            keywords: 'blockchain, technology, potential',
            specialization: 'Information Technology',
            dateUploaded: '10/05/2021',
            department: 'Computer Applications Department'
        },
        {
            id: '6',
            title: 'Machine Learning in Healthcare',
            year: 2022,
            author: 'Wilson, H.; Patel, I.',
            adviser: 'Lewis, O.',
            keywords: 'machine learning, healthcare, data analysis',
            specialization: 'Data Science, Healthcare',
            dateUploaded: '02/18/2023',
            department: 'Information Technology Department'
        },
        {
            id: '7',
            title: 'Economic Impacts of Climate Change',
            year: 2021,
            author: 'Robinson, J.',
            adviser: 'Adams, E.',
            keywords: 'climate change, economics, impact',
            specialization: 'Economics',
            dateUploaded: '08/20/2022',
            department: 'Computer Science Department'
        },
        {
            id: '8',
            title: 'Innovations in Nanotechnology',
            year: 2023,
            author: 'King, K.',
            adviser: 'Carter, R.',
            keywords: 'nanotechnology, innovations, research',
            specialization: 'Nanotechnology',
            dateUploaded: '04/10/2024',
            department: 'Information Technology Department'
        },
        {
            id: '9',
            title: 'Cultural Effects of Globalization',
            year: 2022,
            author: 'Turner, L.',
            adviser: 'Walker, S.',
            keywords: 'globalization, culture, effects',
            specialization: 'Cultural Studies',
            dateUploaded: '06/25/2023',
            department: 'Computer Applications Department'
        },
        {
            id: '10',
            title: 'Developments in Quantum Cryptography',
            year: 2023,
            author: 'Scott, M.; Young, N.',
            adviser: 'Allen, B.',
            keywords: 'quantum cryptography, developments, security',
            specialization: 'Cryptography, Security',
            dateUploaded: '02/01/2024',
            department: 'Information Technology Department'
        },
        // New data entries
        {
            id: '11',
            title: 'AI in Finance: A Comprehensive Study',
            year: 2022,
            author: 'Brown, T.',
            adviser: 'Green, H.',
            keywords: 'AI, finance, analysis',
            specialization: 'Finance, AI',
            dateUploaded: '09/12/2023',
            department: 'Computer Applications Department'
        },
        {
            id: '12',
            title: 'Renewable Energy Technologies',
            year: 2023,
            author: 'Morgan, L.; Hall, J.',
            adviser: 'Mitchell, D.',
            keywords: 'renewable energy, technology, sustainability',
            specialization: 'Energy Studies',
            dateUploaded: '01/25/2024',
            department: 'Computer Science Department'
        },
        {
            id: '13',
            title: 'Advances in Virtual Reality',
            year: 2023,
            author: 'Taylor, A.',
            adviser: 'Evans, R.',
            keywords: 'virtual reality, technology, advances',
            specialization: 'Virtual Reality',
            dateUploaded: '03/10/2024',
            department: 'Information Technology Department'
        },
        {
            id: '14',
            title: 'Genomics and Personalized Medicine',
            year: 2022,
            author: 'King, R.; Lewis, S.',
            adviser: 'White, K.',
            keywords: 'genomics, personalized medicine, health',
            specialization: 'Genomics',
            dateUploaded: '08/16/2023',
            department: 'Information Systems Department'
        },
        {
            id: '15',
            title: 'Ethics in Artificial Intelligence',
            year: 2021,
            author: 'Martin, N.',
            adviser: 'Harris, J.',
            keywords: 'ethics, AI, technology',
            specialization: 'Ethics',
            dateUploaded: '12/05/2022',
            department: 'Computer Science Department'
        },
        {
            id: '16',
            title: 'The Future of Quantum Computing',
            year: 2023,
            author: 'Davis, Q.',
            adviser: 'Clark, T.',
            keywords: 'quantum computing, future, technology',
            specialization: 'Computer Science',
            dateUploaded: '02/28/2024',
            department: 'Computer Science Department'
        },
        {
            id: '17',
            title: 'Cybersecurity Trends and Threats',
            year: 2023,
            author: 'Harris, J.',
            adviser: 'Mitchell, C.',
            keywords: 'cybersecurity, trends, threats',
            specialization: 'Cybersecurity',
            dateUploaded: '03/22/2024',
            department: 'Information Systems Department'
        },
        {
            id: '18',
            title: 'Machine Learning Algorithms for Big Data',
            year: 2022,
            author: 'Lee, W.; Nguyen, M.',
            adviser: 'Robinson, A.',
            keywords: 'machine learning, big data, algorithms',
            specialization: 'Data Science',
            dateUploaded: '04/15/2023',
            department: 'Computer Science Department'
        },
        {
            id: '19',
            title: 'Advancements in Renewable Resources',
            year: 2021,
            author: 'Walker, B.',
            adviser: 'Allen, J.',
            keywords: 'renewable resources, advancements, environment',
            specialization: 'Environmental Science',
            dateUploaded: '09/10/2022',
            department: 'Information Systems Department'
        },
        {
            id: '20',
            title: 'Computational Biology Techniques',
            year: 2023,
            author: 'Smith, C.',
            adviser: 'Green, K.',
            keywords: 'computational biology, techniques, research',
            specialization: 'Biology',
            dateUploaded: '01/05/2024',
            department: 'Information Technology Department'
        }
    ];
}