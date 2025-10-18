const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const Category = require('../models/Category');
const Book = require('../models/Book');
const categories = [
    {
        name: 'Self-Help',
        description: 'Improve yourself with personal development and motivational books',
        coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500'
    },
    {
        name: 'Science',
        description: 'Explore physics, chemistry, biology, and scientific discoveries',
        coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500'
    },
    {
        name: 'Business',
        description: 'Master business strategies, entrepreneurship, and management skills',
        coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500'
    },
    {
        name: 'Biographies',
        description: 'Inspiring life stories of remarkable people who changed the world',
        coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500'
    },
    {
        name: 'Indian History',
        description: 'Journey through India\'s freedom struggle and rich historical heritage',
        coverImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500'
    },
    {
        name: 'Indian Polity & Economy',
        description: 'Understand India\'s political system, constitution, and economic growth',
        coverImage: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=500'
    },
    {
        name: 'Fiction',
        description: 'Dive into imaginative stories, novels, and literary masterpieces',
        coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'
    },
    {
        name: 'Fantasy, Sci-Fi & Mystery',
        description: 'Explore magical realms, futuristic worlds, and thrilling mysteries',
        coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500'
    },
    {
        name: 'Religious & Philosophical Texts',
        description: 'Ancient wisdom and spiritual teachings from sacred scriptures',
        coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500'
    },
    {
        name: 'Graphic Novels & Comics',
        description: 'Visual storytelling with superheroes, action, and adventure',
        coverImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=500'
    }
];

const booksData = {
    "Self-Help": [
        {
            title: 'Atomic Habits',
            author: 'James Clear',
            description: 'Tiny changes, remarkable results in building good habits.',
            link: 'https://dn790007.ca.archive.org/0/items/atomic-habits-pdfdrive/Atomic%20habits%20%28%20PDFDrive%20%29.pdf'
        },
        {
            title: 'Ikigai',
            author: 'Héctor García',
            description: 'The Japanese secret to a long and happy life.',
            link: 'https://dn790007.ca.archive.org/0/items/ikigai-the-japanese-secret-to-a-long-and-happy-life-pdfdrive.com/Ikigai%20_%20the%20Japanese%20secret%20to%20a%20long%20and%20happy%20life%20%28%20PDFDrive.com%20%29.pdf'
        },
        {
            title: 'The Power of Habit',
            author: 'Charles Duhigg',
            description: 'How habits are formed and how they shape our lives.',
            link: 'https://ia803102.us.archive.org/35/items/CharlesDuhigg.ThePowerOfHabit_201808/Charles-Duhigg.The-Power-of-Habit.pdf'
        }
    ],
    "Science": [
        {
            title: 'Sapiens: A Brief History of Humankind',
            author: 'Yuval Noah Harari',
            description: 'The story of humankind and our evolution.',
            link: 'https://ethz.ch/content/dam/ethz/special-interest/usys/ites/ecosystem-management-dam/documents/EducationDOC/Readings_DOC/sapiens.pdf'
        }
    ],
    "Business": [
        {
            title: 'Rich Dad Poor Dad',
            author: 'Robert T. Kiyosaki',
            description: 'What the rich teach their kids about money that the poor and middle class do not.',
            link: 'https://dn721905.ca.archive.org/0/items/rich-dad-poor-dad_bongotweet/rich-dad-poor-dad.pdf'
        },
        {
            title: 'The Psychology of Money',
            author: 'Morgan Housel',
            description: 'Timeless lessons on wealth, greed, and happiness.',
            link: 'https://hostnezt.com/cssfiles/general/the-psychology-of-money-by-morgan-housel.pdf'
        }
    ],
    "Biographies": [
        {
            title: 'Steve Jobs',
            author: 'Walter Isaacson',
            description: 'The exclusive biography of the visionary founder of Apple.',
            link: 'https://www.readdiary.com/wp-content/uploads/2022/05/Steve-Jobs-PDFDrive-1.pdf'
        },
        {
            title: 'Wings of Fire',
            author: 'A.P.J. Abdul Kalam',
            description: 'The inspiring autobiography of the former President of India.',
            link: 'https://ati.dae.gov.in/ati12052021_8.pdf'
        },
        {
            title: 'The Diary of a Young Girl',
            author: 'Anne Frank',
            description: 'The powerful and moving diary of a young Jewish girl during the Holocaust.',
            link: 'https://ajarng.weebly.com/uploads/8/2/3/0/8230849/pages_from_anne_frank_-_the_diary_of_a_young_girl.pdf'
        },
        {
            title: 'Long Walk to Freedom',
            author: 'Nelson Mandela',
            description: 'The autobiography of the anti-apartheid revolutionary and former South African President.',
            link: 'https://courseware.cutm.ac.in/wp-content/uploads/2020/05/Long-Walk-to-Freedom-Autobiography-of-Nelson-Mandela.pdf'
        },
        {
            title: 'Educated',
            author: 'Tara Westover',
            description: 'A memoir about overcoming hardship to gain an education.',
            link: 'https://ia800205.us.archive.org/15/items/educated-a-memoir_202403/Educated%20_%20A%20memoir.pdf'
        },
        {
            title: 'Becoming',
            author: 'Michelle Obama',
            description: 'The inspiring life story and journey of the former First Lady of the United States.',
            link: 'https://icrrd.com/public/media/15-05-2021-133541Becoming-Michelle-Obama.pdf'
        }
    ],
    "Indian History": [
        {
            title: "India's Struggle for Independence",
            author: 'Bipan Chandra',
            description: 'A comprehensive account of the freedom movement.',
            link: 'https://www.davcollegekanpur.ac.in/assets/ebooks/History/India%E2%80%99s%20Struggle%20for%20Independence%20Bipan%20chandra.pdf'
        },
        {
            title: 'The Discovery of India',
            author: 'Jawaharlal Nehru',
            description: "A journey through India's rich history and culture.",
            link: 'https://library.bjp.org/jspui/bitstream/123456789/277/1/The-Discovery-Of-India-Jawaharlal-Nehru.pdf'
        },
        {
            title: 'An Autobiography',
            author: 'M.K. Gandhi',
            description: 'The life story and philosophies of the Mahatma.',
            link: 'https://www.mkgandhi.org/ebks/An-Autobiography.pdf'
        },
        {
            title: 'Why I Am an Atheist',
            author: 'Bhagat Singh',
            description: 'A powerful essay on reason and revolution from the famed freedom fighter.',
            link: 'https://theanarchistlibrary.org/mirror/b/bs/bhagat-singh-why-i-am-an-atheist.c5.pdf'
        },
        {
            title: 'Veer Savarkar',
            author: 'Uday Mahurkar',
            description: 'The man who could have prevented partition.',
            link: 'https://sanatanshop.com/wp-content/uploads/2022/03/veer_savarkar_intro_mar.pdf'
        }
    ],
    "Indian Polity & Economy": [
        {
            title: 'Indian Economy',
            author: 'Ramesh Singh',
            description: 'A key text for understanding the Indian economy, widely read by civil service aspirants.',
            link: 'https://www.jsscacs.edu.in/sites/default/files/Files/Indian_Economy_Ramesh_Singh_7e_0.pdf'
        },
        {
            title: 'Economic Survey of India',
            author: 'Govt. of India',
            description: "The official annual report on the state of India's economy.",
            link: 'https://www.indiabudget.gov.in/economicsurvey/doc/echapter.pdf'
        },
        {
            title: 'India Unbound',
            author: 'Gurcharan Das',
            description: "A narrative of India's economic journey from independence to a global powerhouse.",
            link: 'https://inspiredforias.wordpress.com/wp-content/uploads/2017/06/india-unbound-by-gurcharan-das.pdf'
        },
        {
            title: 'Indian Polity',
            author: 'M. Laxmikanth',
            description: "Considered the 'bible' for Indian civil services preparation on the topic of polity.",
            link: 'https://blogmedia.testbook.com/kmat-kerala/wp-content/uploads/2023/06/indian-polity-4024d1bc.pdf'
        },
        {
            title: 'Introduction to the Constitution of India',
            author: 'D.D. Basu',
            description: 'A classic, scholarly work on the Indian Constitution.',
            link: 'https://blogmedia.testbook.com/kmat-kerala/wp-content/uploads/2023/06/indian-polity-by-dd-bashu-edd349fb.pdf'
        }
    ],
    "Fiction": [
        {
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            description: 'A philosophical story about a shepherd boy who journeys in search of treasure.',
            link: 'https://icrrd.com/public/media/15-05-2021-084550The-Alchemist-Paulo-Coelho.pdf'
        },
        {
            title: 'The God of Small Things',
            author: 'Arundhati Roy',
            description: 'This Booker Prize-winning novel tells the story of fraternal twins in Kerala, India.',
            link: 'https://vidyaprabodhinicollege.edu.in/VPCCECM/ebooks/ENGLISH%20LITERATURE/Arundhati%20Roy/Arundhati%20Roy%20-%20The%20God%20of%20Small%20Things.pdf'
        },
        {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            description: 'A gripping story about justice and morality in the deep South of America.',
            link: 'https://www.raio.org/TKMFullText.pdf'
        },
        {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            description: 'A classic romance set against the backdrop of societal norms in 19th-century England.',
            link: 'https://giove.isti.cnr.it/demo/eread/Libri/joy/Pride.pdf'
        },
        {
            title: '1984',
            author: 'George Orwell',
            description: 'A classic dystopian novel exploring totalitarianism, mass surveillance, and propaganda.',
            link: 'https://www.clarkchargers.org/ourpages/auto/2015/3/10/50720556/1984.pdf'
        },
        {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            description: 'The story of love, wealth, and the American Dream in the Jazz Age.',
            link: 'https://ct02210097.schoolwires.net/site/handlers/filedownload.ashx?moduleinstanceid=26616&dataid=28467&FileName=The%20Great%20Gatsby.pdf'
        }
    ],
    "Fantasy, Sci-Fi & Mystery": [
        {
            title: "Harry Potter and the Sorcerer's Stone",
            author: 'J.K. Rowling',
            description: "A young wizard's journey begins in this magical adventure.",
            link: 'https://hazidesaratcollege.ac.in/library/uploads/85jkr_harrypotter_1.pdf'
        },
        {
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            description: 'A tale of a small hobbit on an unexpected journey to reclaim treasure.',
            link: 'https://rsd2-alert-durden-reading-room.weebly.com/uploads/6/7/1/6/6716949/the_hobbit_tolkien.pdf'
        },
        {
            title: 'Dune',
            author: 'Frank Herbert',
            description: 'A landmark science fiction epic of politics, religion, and power on a desert planet.',
            link: 'https://dn720004.ca.archive.org/0/items/english-collections-1/Dune%20Messiah%20-%20Frank%20Herbert.pdf'
        },
        {
            title: 'And Then There Were None',
            author: 'Agatha Christie',
            description: 'Ten strangers are lured to an island and picked off one by one. A masterpiece of mystery.',
            link: 'http://pustaka.unp.ac.id/file/abstrak_kki/EBOOKS/And%20Then%20There%20Were%20None.pdf'
        }
    ],
    "Religious & Philosophical Texts": [
        {
            title: 'Bhagavad Gita',
            author: '',
            description: 'An ancient Indian scripture offering profound insights on duty, action, and the nature of existence.',
            link: 'https://ignca.gov.in/Asi_data/279.pdf'
        },
        {
            title: 'The Quran',
            author: '',
            description: 'The central religious text of Islam, believed to be a revelation from God (Allah).',
            link: 'https://www.pdfquran.com/download/big/big-quran.pdf'
        },
        {
            title: 'The Bible',
            author: '',
            description: 'A collection of religious texts or scriptures sacred to Christians, Jews, Samaritans, and others.',
            link: 'https://www.churchofjesuschrist.org/bc/content/shared/content/english/pdf/language-materials/83512_eng.pdf'
        },
        {
            title: 'The Dhammapada',
            author: '',
            description: 'A collection of sayings of the Buddha in verse form and one of the most widely read Buddhist scriptures.',
            link: 'https://www.buddhanet.net/pdf_file/scrndhamma.pdf'
        }
    ],
    "Graphic Novels & Comics": [
        {
            title: 'Spider-Man: Into the Spider-Verse',
            author: '',
            description: 'A comic exploring different Spider-Man universes and characters.',
            link: 'https://ia600404.us.archive.org/13/items/across-the-spider-verse-the-art-of-the-movie/Spider-Man%20Across%20the%20Spider-Verse%20The%20Art%20of%20the%20Movie_text.pdf'
        },
        {
            title: 'The Avengers',
            author: '',
            description: 'The Avengers team up to fight against an alien invasion.',
            link: 'https://drive.google.com/file/d/1SQZSRT8kW8PXr4iP8PZ7CqVWvMtxspE4/view'
        },
        {
            title: 'Batman: The Killing Joke',
            author: '',
            description: "A dark exploration of the Joker's origin and Batman's struggles.",
            link: 'https://acephalous.typepad.com/files/killingjoke.pdf'
        },
        {
            title: 'X-Men: Dark Phoenix',
            author: '',
            description: 'The X-Men battle a powerful force as Jean Grey becomes the Dark Phoenix.',
            link: 'https://ia601501.us.archive.org/24/items/uncanny-x-men-137-1980-digital-minutemen-syl-3nt-bob/Uncanny%20X-Men%20125%20(1979)%20(digital)%20(Minutemen-Syl3ntBob).pdf'
        }
    ]
};

// ---- FETCH COVER IMAGE FUNCTION ----
async function fetchCoverImage(title, author) {
    try {
        const query = `${title} ${author}`.replace(/\s+/g, '+');
        const searchUrl = `https://openlibrary.org/search.json?title=${query}`;
        const res = await axios.get(searchUrl);

        if (res.data && res.data.docs && res.data.docs.length > 0) {
            const book = res.data.docs.find(doc => doc.cover_i);
            if (book && book.cover_i) {
                return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
            }
        }
        return null;
    } catch (err) {
        console.warn(`⚠️ Could not fetch cover for "${title}"`);
        return null;
    }
}

// ---- SEED FUNCTION ----
const seedDatabase = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        await Category.deleteMany({});
        await Book.deleteMany({});
        console.log('🧹 Cleared old data');

        for (const categoryData of categories) {
            const category = await Category.create(categoryData);
            console.log(`📚 Created category: ${category.name}`);

            const categoryBooks = booksData[category.name];
            if (categoryBooks) {
                for (const bookData of categoryBooks) {
                    let coverImage = bookData.coverImage || null;

                    // If no coverImage, try to fetch one
                    if (!coverImage) {
                        coverImage = await fetchCoverImage(bookData.title, bookData.author);
                    }

                    // If still missing, use a clean fallback
                    if (!coverImage) {
                        coverImage = `https://placehold.co/400x600?text=${encodeURIComponent(bookData.title)}`;
                    }

                    const book = await Book.create({
                        ...bookData,
                        category: category._id,
                        coverImage: bookData.coverImage, // <-- keep original cover
                        link: bookData.link,             // <-- keep PDF link
                        likes: Math.floor(Math.random() * 50)
                    });


                    console.log(`   ➕ Added: ${book.title}`);
                }
            }
        }

        console.log('🎉 Database seeded successfully with real covers!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    }
};

seedDatabase();