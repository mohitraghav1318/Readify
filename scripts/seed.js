const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('../models/Category');
const Book = require('../models/Book');

const categories = [
    {
        name: 'Programming',
        description: 'Learn coding, software development, and computer science fundamentals',
        coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500'
    },
    {
        name: 'Business',
        description: 'Master business strategies, entrepreneurship, and management skills',
        coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500'
    },
    {
        name: 'Science',
        description: 'Explore physics, chemistry, biology, and scientific discoveries',
        coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500'
    },
    {
        name: 'History',
        description: 'Journey through time and learn about historical events and civilizations',
        coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500'
    },
    {
        name: 'Self-Help',
        description: 'Improve yourself with personal development and motivational books',
        coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500'
    },
    {
        name: 'Fiction',
        description: 'Dive into imaginative stories, novels, and literary masterpieces',
        coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'
    },
    {
        name: 'Mathematics',
        description: 'Understand numbers, equations, and mathematical concepts',
        coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500'
    },
    {
        name: 'Art & Design',
        description: 'Explore creativity, design principles, and artistic techniques',
        coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500'
    },
    {
        name: 'Psychology',
        description: 'Understand the human mind, behavior, and mental processes',
        coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500'
    },
    {
        name: 'Philosophy',
        description: 'Question existence, ethics, and the nature of reality',
        coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500'
    }
];

const booksData = {
    Programming: [
        { title: 'Clean Code', author: 'Robert C. Martin', description: 'A handbook of agile software craftsmanship teaching how to write code that is easy to read, maintain, and extend.' },
        { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', description: 'Discover the elegant, innovative, and highly expressive language that lies hidden in JavaScript.' },
        { title: 'Python Crash Course', author: 'Eric Matthes', description: 'A hands-on, project-based introduction to programming in Python.' },
        { title: 'The Pragmatic Programmer', author: 'David Thomas', description: 'Your journey to mastery through practical advice for software craftsmanship.' },
        { title: 'Design Patterns', author: 'Gang of Four', description: 'Elements of reusable object-oriented software design patterns.' },
        { title: 'You Don\'t Know JS', author: 'Kyle Simpson', description: 'Deep dive into the core mechanisms of JavaScript.' },
        { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', description: 'A modern introduction to programming with JavaScript.' },
        { title: 'Head First Java', author: 'Kathy Sierra', description: 'A brain-friendly guide to learning Java programming.' },
        { title: 'Refactoring', author: 'Martin Fowler', description: 'Improving the design of existing code through refactoring techniques.' },
        { title: 'Code Complete', author: 'Steve McConnell', description: 'A practical handbook of software construction best practices.' }
    ],
    Business: [
        { title: 'The Lean Startup', author: 'Eric Ries', description: 'How today\'s entrepreneurs use continuous innovation to create radically successful businesses.' },
        { title: 'Good to Great', author: 'Jim Collins', description: 'Why some companies make the leap and others don\'t.' },
        { title: 'Zero to One', author: 'Peter Thiel', description: 'Notes on startups, or how to build the future.' },
        { title: 'The 7 Habits', author: 'Stephen Covey', description: 'Powerful lessons in personal change and effective leadership.' },
        { title: 'Thinking Fast and Slow', author: 'Daniel Kahneman', description: 'Insights into the two systems that drive the way we think.' },
        { title: 'The Innovator\'s Dilemma', author: 'Clayton Christensen', description: 'When new technologies cause great firms to fail.' },
        { title: 'Start With Why', author: 'Simon Sinek', description: 'How great leaders inspire everyone to take action.' },
        { title: 'The Hard Thing', author: 'Ben Horowitz', description: 'Building a business when there are no easy answers.' },
        { title: 'Built to Last', author: 'Jim Collins', description: 'Successful habits of visionary companies.' },
        { title: 'The E-Myth Revisited', author: 'Michael Gerber', description: 'Why most small businesses don\'t work and what to do about it.' }
    ],
    Science: [
        { title: 'A Brief History of Time', author: 'Stephen Hawking', description: 'From the Big Bang to black holes, explore the universe.' },
        { title: 'Cosmos', author: 'Carl Sagan', description: 'A journey through space and time exploring the universe.' },
        { title: 'The Selfish Gene', author: 'Richard Dawkins', description: 'A gene-centered view of evolution and natural selection.' },
        { title: 'Sapiens', author: 'Yuval Noah Harari', description: 'A brief history of humankind from stone age to silicon age.' },
        { title: 'The Origin of Species', author: 'Charles Darwin', description: 'The foundation of evolutionary biology.' },
        { title: 'Astrophysics for People', author: 'Neil deGrasse Tyson', description: 'Understanding the universe in a hurry.' },
        { title: 'The Double Helix', author: 'James Watson', description: 'A personal account of the discovery of DNA structure.' },
        { title: 'The Elegant Universe', author: 'Brian Greene', description: 'Superstrings, hidden dimensions, and the quest for ultimate theory.' },
        { title: 'Quantum Theory', author: 'David Bohm', description: 'A deeper understanding of quantum mechanics.' },
        { title: 'The Gene', author: 'Siddhartha Mukherjee', description: 'An intimate history of genetics and heredity.' }
    ],
    History: [
        { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', description: 'The fates of human societies throughout history.' },
        { title: '1776', author: 'David McCullough', description: 'The story of the American Revolution year.' },
        { title: 'The Silk Roads', author: 'Peter Frankopan', description: 'A new history of the world through trade routes.' },
        { title: 'SPQR', author: 'Mary Beard', description: 'A history of ancient Rome and its empire.' },
        { title: 'Team of Rivals', author: 'Doris Kearns Goodwin', description: 'The political genius of Abraham Lincoln.' },
        { title: 'The History of', author: 'Susan Wise Bauer', description: 'Ancient world from earliest accounts to fall of Rome.' },
        { title: 'Churchill', author: 'Andrew Roberts', description: 'Walking with destiny through World War II.' },
        { title: 'The Wright Brothers', author: 'David McCullough', description: 'The dramatic story behind the first flight.' },
        { title: 'Alexander Hamilton', author: 'Ron Chernow', description: 'Biography of America\'s founding father.' },
        { title: 'The Rise and Fall', author: 'William Shirer', description: 'A history of Nazi Germany.' }
    ],
    'Self-Help': [
        { title: 'Atomic Habits', author: 'James Clear', description: 'Tiny changes, remarkable results in building good habits.' },
        { title: 'The Power of Now', author: 'Eckhart Tolle', description: 'A guide to spiritual enlightenment and present moment.' },
        { title: 'How to Win Friends', author: 'Dale Carnegie', description: 'Timeless advice for building relationships and influence.' },
        { title: 'Think and Grow Rich', author: 'Napoleon Hill', description: 'The philosophy of personal achievement and success.' },
        { title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', description: 'Finding purpose through suffering and adversity.' },
        { title: 'The Subtle Art', author: 'Mark Manson', description: 'A counterintuitive approach to living a good life.' },
        { title: 'Mindset', author: 'Carol Dweck', description: 'The new psychology of success through growth mindset.' },
        { title: 'Grit', author: 'Angela Duckworth', description: 'The power of passion and perseverance.' },
        { title: 'Deep Work', author: 'Cal Newport', description: 'Rules for focused success in a distracted world.' },
        { title: 'The 5 AM Club', author: 'Robin Sharma', description: 'Own your morning, elevate your life.' }
    ],
    Fiction: [
        { title: '1984', author: 'George Orwell', description: 'A dystopian social science fiction novel about totalitarianism.' },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', description: 'A story of racial injustice and childhood innocence.' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', description: 'The American dream in the roaring twenties.' },
        { title: 'Pride and Prejudice', author: 'Jane Austen', description: 'A romantic novel of manners and social class.' },
        { title: 'The Catcher in the Rye', author: 'J.D. Salinger', description: 'A story of teenage rebellion and alienation.' },
        { title: 'Lord of the Flies', author: 'William Golding', description: 'Survival and civilization on a deserted island.' },
        { title: 'Harry Potter', author: 'J.K. Rowling', description: 'The magical journey of the boy who lived.' },
        { title: 'The Hobbit', author: 'J.R.R. Tolkien', description: 'An unexpected journey to reclaim a homeland.' },
        { title: 'Brave New World', author: 'Aldous Huxley', description: 'A dystopian vision of a technologically advanced future.' },
        { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', description: 'An epic quest to destroy the One Ring.' }
    ],
    Mathematics: [
        { title: 'The Joy of x', author: 'Steven Strogatz', description: 'A guided tour of mathematics from basics to infinity.' },
        { title: 'Fermat\'s Enigma', author: 'Simon Singh', description: 'The epic quest to solve mathematics greatest mystery.' },
        { title: 'How Not to Be Wrong', author: 'Jordan Ellenberg', description: 'The power of mathematical thinking in everyday life.' },
        { title: 'The Man Who Knew Infinity', author: 'Robert Kanigel', description: 'A life of the genius Ramanujan.' },
        { title: 'Prime Obsession', author: 'John Derbyshire', description: 'Bernhard Riemann and the greatest unsolved problem.' },
        { title: 'Gödel, Escher, Bach', author: 'Douglas Hofstadter', description: 'An eternal golden braid of mathematics, art, and music.' },
        { title: 'The Code Book', author: 'Simon Singh', description: 'The science of secrecy from ancient Egypt to quantum.' },
        { title: 'Euler\'s Gem', author: 'David Richeson', description: 'The polyhedron formula and the birth of topology.' },
        { title: 'Infinite Powers', author: 'Steven Strogatz', description: 'How calculus reveals the secrets of the universe.' },
        { title: 'Love and Math', author: 'Edward Frenkel', description: 'The heart of hidden reality through mathematics.' }
    ],
    'Art & Design': [
        { title: 'The Design of Everyday', author: 'Don Norman', description: 'Principles of good design in everyday objects.' },
        { title: 'Steal Like an Artist', author: 'Austin Kleon', description: '10 things nobody told you about being creative.' },
        { title: 'The Elements of Style', author: 'William Strunk', description: 'Classic guide to writing and design principles.' },
        { title: 'Thinking with Type', author: 'Ellen Lupton', description: 'A critical guide for designers, writers, and students.' },
        { title: 'Ways of Seeing', author: 'John Berger', description: 'Understanding visual culture and art perception.' },
        { title: 'The Artist\'s Way', author: 'Julia Cameron', description: 'A spiritual path to higher creativity.' },
        { title: 'Creative Confidence', author: 'Tom Kelley', description: 'Unleashing the creative potential within us all.' },
        { title: 'Logo Design Love', author: 'David Airey', description: 'A guide to creating iconic brand identities.' },
        { title: 'Color: A Course', author: 'Paul Zelanski', description: 'Mastering color theory in art and design.' },
        { title: 'Making and Breaking', author: 'Peter Dormer', description: 'The contemporary craft movement analyzed.' }
    ],
    Psychology: [
        { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', description: 'The two systems that drive how we think.' },
        { title: 'Influence', author: 'Robert Cialdini', description: 'The psychology of persuasion and decision making.' },
        { title: 'Predictably Irrational', author: 'Dan Ariely', description: 'The hidden forces that shape our decisions.' },
        { title: 'The Body Keeps Score', author: 'Bessel van der Kolk', description: 'Brain, mind, and body in healing trauma.' },
        { title: 'Flow', author: 'Mihaly Csikszentmihalyi', description: 'The psychology of optimal experience.' },
        { title: 'Emotional Intelligence', author: 'Daniel Goleman', description: 'Why EQ matters more than IQ.' },
        { title: 'The Lucifer Effect', author: 'Philip Zimbardo', description: 'Understanding how good people turn evil.' },
        { title: 'Quiet', author: 'Susan Cain', description: 'The power of introverts in a world that can\'t stop talking.' },
        { title: 'The Happiness Hypothesis', author: 'Jonathan Haidt', description: 'Finding modern truth in ancient wisdom.' },
        { title: 'Blink', author: 'Malcolm Gladwell', description: 'The power of thinking without thinking.' }
    ],
    Philosophy: [
        { title: 'Meditations', author: 'Marcus Aurelius', description: 'Stoic philosophy and personal reflections of a Roman emperor.' },
        { title: 'The Republic', author: 'Plato', description: 'Justice, the ideal state, and the nature of reality.' },
        { title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche', description: 'A philosophical novel about the Übermensch.' },
        { title: 'Being and Time', author: 'Martin Heidegger', description: 'An inquiry into the meaning of being.' },
        { title: 'The Consolation', author: 'Boethius', description: 'Philosophy as comfort in times of trouble.' },
        { title: 'Ethics', author: 'Spinoza', description: 'Demonstrated in geometrical order.' },
        { title: 'Critique of Pure Reason', author: 'Immanuel Kant', description: 'The limits and scope of human knowledge.' },
        { title: 'The Phenomenology', author: 'Georg Hegel', description: 'Spirit\'s journey to absolute knowledge.' },
        { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche', description: 'Challenging traditional morality and truth.' },
        { title: 'The Myth of Sisyphus', author: 'Albert Camus', description: 'The absurd and the meaning of life.' }
    ]
};

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        await Category.deleteMany({});
        await Book.deleteMany({});
        console.log('Cleared existing data');

        for (const categoryData of categories) {
            const category = await Category.create(categoryData);
            console.log(`Created category: ${category.name}`);

            const categoryBooks = booksData[category.name];
            if (categoryBooks) {
                for (const bookData of categoryBooks) {
                    const book = await Book.create({
                        ...bookData,
                        category: category._id,
                        coverImage: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=400&h=600&fit=crop`,
                        likes: Math.floor(Math.random() * 50)
                    });
                    console.log(`  - Created book: ${book.title}`);
                }
            }
        }

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();
