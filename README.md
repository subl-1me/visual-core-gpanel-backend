

# Visual Core GPanel

## Overview
Visual Core GPanel is a modern, responsive admin panel designed to manage a business specializing in AI-generated custom shirts. The application provides a comprehensive interface for overseeing all business operations, including product management, inventory tracking, order processing, supplier management, customer data, and financial analytics. The front-end is built with **Angular** for a dynamic and scalable user interface, while the back-end is powered by **Node.js** for robust API-driven functionality. The interface is styled with **Tailwind CSS** (via CDN in the prototype) for a clean, professional, and responsive design, with support for light and dark themes.

### Features
- **Login Page**: Secure and professional login interface with email and password authentication.
- **Responsive Sidebar**: Persistent on desktop, toggleable on mobile, with navigation to all sections (Dashboard, Product Creation, Inventory, Production History, Suppliers, Customers, Orders, Finances, Settings).
- **Dashboard**: Displays real-time metrics (e.g., shirts sold today, stock levels, pending orders, daily revenue) and placeholders for charts and recent products.
- **Product Creation**: Form to register new shirts with fields for ID, AI-generated design preview, size, color, supplier, production date, and notes.
- **Inventory Management**: Sortable and filterable table for stock tracking, with options to mark items as sold or shipped.
- **Production History**: Timeline or table view of produced shirts, with date range filtering and export options (Excel/PDF).
- **Suppliers**: Manage supplier information, including contact details, material quality, and order history.
- **Customers**: Track customer data, purchase history, and design preferences.
- **Orders**: Manage incoming orders, track shipping status, and view customer order history.
- **Finances/Sales**: Analytics for daily, weekly, and monthly revenue, with rankings of top-selling designs.
- **Settings**: Configure notifications (e.g., low stock alerts) and toggle between light/dark themes.
- **AI Integration**: Preview AI-generated designs and save prompts used for generation.
- **Notifications**: Real-time alerts for low stock, new orders, or returns.

## Technologies
- **Front-End**: Angular (v18.x) for a dynamic and component-based UI.
- **Back-End**: Node.js with Express.js for RESTful API development.
- **Styling**: Tailwind CSS (via CDN in prototype, can be integrated locally).
- **Database**: (To be specified, e.g., MongoDB, PostgreSQL, or another suitable database for storing product, customer, and order data).
- **Other**: Minimal vanilla JavaScript for UI interactions (e.g., sidebar toggle, theme switch) in the prototype.

## Prerequisites
- Node.js (v16.x or higher)
- Angular CLI (v18.x or higher)
- Git
- A compatible database (e.g., MongoDB or PostgreSQL, depending on implementation)
- (Optional) Docker for containerized deployment

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/visual-core-gpanel-backend.git
   cd visual-core-gpanel-backend
   ```

2. **Install Back-End Dependencies**:
   Install Node.js dependencies:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Create a `.env` file in the `backend` directory based on `.env.example` and set up your database connection, API keys, and other configurations.
   - Example `.env`:
     ```env
     PORT=3000
     DATABASE_URL=mongodb://localhost:27017/custom-shirts
     JWT_SECRET=your-secret-key
     ```

4. **Run the Back-End**:
   Start the Node.js server:
   ```bash
   npm start
   ```

6. **Access the Application**:
   The back-end API will typically run on `http://localhost:3000`.

## Usage
1. **Login**: Access the admin panel via the login page using valid credentials.
2. **Navigate Sections**: Use the sidebar to access different modules (Dashboard, Inventory, etc.).
3. **Manage Products**: Add new shirts via the "Product Creation" section, including AI-generated design previews.
4. **Track Operations**: Monitor inventory, orders, and finances in real-time using tables, filters, and charts.
5. **Toggle Theme**: Switch between light and dark modes in the Settings section.
6. **Export Data**: Use the export feature in the Production History section to download reports in Excel or PDF format.

## Project Structure
```
visual-core-gpanel-backend/
├── ../                    # Node.js/Express back-end
│   ├── src/                    # Source code
│   │   ├── routes/             # API routes (e.g., products, orders)
│   │   ├── models/             # Database models
│   │   ├── controllers/        # Business logic
│   │   └── middleware/         # Authentication, validation, etc.
│   ├── .env.example            # Example environment variables
│   └── package.json            # Back-end dependencies
├── README.md                   # This file
└── LICENSE                     # License file (e.g., MIT)
```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or support, contact [julio.ugalde404@gmail.com] or open an issue on GitHub.

