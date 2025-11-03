
# product-manage

## Giới thiệu

Đây là website quản lý sản phẩm (Product Management System) được xây dựng bằng Node.js với kiến trúc MVC (Model-View-Controller). Ứng dụng cung cấp giao diện admin để quản lý sản phẩm, danh mục, vai trò người dùng và giao diện client để hiển thị sản phẩm.

## Kiến trúc tổng quan

Dự án sử dụng kiến trúc **MVC (Model-View-Controller)** với cấu trúc thư mục được tổ chức rõ ràng:

```
product-manage/
├── app.js                  # Entry point của ứng dụng
├── package.json            # Quản lý dependencies và scripts
├── config/                 # Cấu hình hệ thống
├── models/                 # Data models (MongoDB/Mongoose)
├── controllers/            # Business logic
├── routes/                 # Route definitions
├── views/                  # Templates (Pug)
├── middlewares/            # Custom middlewares
├── helpers/                # Utility functions
├── validates/              # Validation logic
└── public/                 # Static assets (CSS, JS, images)
```

## Chi tiết cấu trúc thư mục

### 1. **config/** - Cấu hình hệ thống
Chứa các file cấu hình cho ứng dụng:
- `database.js` - Kết nối MongoDB
- `cloudinary.config.js` - Cấu hình upload ảnh lên Cloudinary
- `system.js` - Cấu hình hệ thống (prefix admin path, session settings)

### 2. **models/** - Data Models
Định nghĩa schema và tương tác với MongoDB thông qua Mongoose:
- `product.model.js` - Model sản phẩm (title, price, description, images, slug, status)
- `productCategory.model.js` - Model danh mục sản phẩm
- `role.model.js` - Model vai trò người dùng
- `user.model.js` - Model người dùng

### 3. **controllers/** - Business Logic
Xử lý logic nghiệp vụ, chia thành 2 phần:

#### Admin Controllers (`controllers/admin/`)
- `product.controller.js` - CRUD sản phẩm, thay đổi trạng thái, bulk actions
- `product-category.controller.js` - Quản lý danh mục sản phẩm
- `dashboard.controller.js` - Trang tổng quan admin
- `role.controller.js` - Quản lý vai trò và phân quyền
- `account.controller.js` - Quản lý tài khoản admin
- `password.controller.js` - Đổi mật khẩu

#### Client Controllers (`controllers/client/`)
- `home.controler.js` - Trang chủ
- `product.controller.js` - Hiển thị danh sách và chi tiết sản phẩm

### 4. **routes/** - Định tuyến URL
Định nghĩa các endpoint và map với controllers:

#### Admin Routes (`routes/admin/`)
- `index.route.js` - Tổng hợp tất cả admin routes với prefix `/admin`
- `product.route.js` - Routes cho sản phẩm (GET, POST, PATCH, DELETE)
- `product-category.route.js` - Routes cho danh mục
- `dashboard.route.js` - Routes cho dashboard
- `role.route.js` - Routes cho vai trò
- `account.route.js` - Routes cho tài khoản

#### Client Routes (`routes/client/`)
- `index.route.js` - Tổng hợp client routes
- `home.route.js` - Routes trang chủ
- `product.route.js` - Routes xem sản phẩm

### 5. **views/** - Templates (Pug)
Giao diện người dùng sử dụng Pug template engine:

#### Admin Views (`views/admin/`)
- `layouts/default.pug` - Layout chính
- `partials/` - Header, sidebar
- `pages/` - Các trang admin (products, categories, roles, accounts, dashboard)
- `components/` - Các component tái sử dụng (search, pagination, filter, alert)

#### Client Views (`views/client/`)
- `partials/` - Header, footer
- `pages/` - Trang hiển thị sản phẩm

### 6. **middlewares/** - Custom Middlewares
Xử lý các logic trung gian:
- `index.js` - Middleware chính
- `errorHandler.js` - Xử lý lỗi
- `admin/authentication.js` - Xác thực admin
- `admin/uploadCloud.middleware.js` - Upload ảnh lên Cloudinary
- `admin/validate-account.js` - Validate tài khoản admin

### 7. **helpers/** - Utility Functions
Các hàm tiện ích hỗ trợ:
- `pagination.js` - Xử lý phân trang
- `search.js` - Xử lý tìm kiếm
- `filterStatus.js` - Lọc theo trạng thái
- `generate.js` - Generate mã, token
- `storageMulter.js` - Cấu hình multer cho upload file

### 8. **validates/** - Validation Logic
Validation cho input:
- `admin/product.validate.js` - Validate dữ liệu sản phẩm

### 9. **public/** - Static Assets
Tài nguyên tĩnh chia theo admin/client:

#### Admin Assets (`public/admin/`)
- `css/style.css` - Styles cho admin
- `js/script.js` - JavaScript chung
- `js/product.js` - Logic riêng cho trang sản phẩm
- `js/role.js` - Logic riêng cho vai trò
- `js/tinymce-config.js` - Cấu hình TinyMCE editor

#### Client Assets (`public/client/`)
- `css/style.css` - Styles cho client
- `js/script.js` - JavaScript cho client

## Flow hoạt động

### Request Flow
```
Client Request
    ↓
app.js (Entry point)
    ↓
Routes (admin/index.route.js hoặc client/index.route.js)
    ↓
Middlewares (authentication, validation, upload)
    ↓
Controllers (xử lý logic)
    ↓
Models (tương tác database)
    ↓
Views (render giao diện)
    ↓
Response to Client
```

### Ví dụ: Tạo sản phẩm mới
1. **Route**: `POST /admin/products/create` → `routes/admin/product.route.js`
2. **Middleware**: Upload file → `multer` → `uploadCloud.middleware.js`
3. **Validation**: `validates/admin/product.validate.js`
4. **Controller**: `controllers/admin/product.controller.js` → `createPost()`
5. **Model**: `models/product.model.js` → Lưu vào MongoDB
6. **Response**: Redirect hoặc render view

## Công nghệ sử dụng

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM cho MongoDB

### Template Engine & Frontend
- **Pug** - Template engine
- **CSS** - Styling
- **JavaScript** - Client-side logic
- **TinyMCE** - Rich text editor

### Libraries & Tools
- **bcrypt** - Mã hóa mật khẩu
- **jsonwebtoken** - JWT authentication
- **express-validator** - Validation
- **multer** - File upload
- **cloudinary** - Cloud storage cho images
- **express-session** - Session management
- **express-flash** - Flash messages
- **method-override** - Support PUT/DELETE methods
- **nodemon** - Auto-restart server (development)

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd product-manage
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` với các biến môi trường:
```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Chạy ứng dụng:
```bash
npm start          # Development mode với nodemon
# hoặc
npm run debug      # Debug mode
```

5. Truy cập:
- Admin: `http://localhost:3000/admin/products`
- Client: `http://localhost:3000/`

## Các tính năng chính

### Admin Panel
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý danh mục sản phẩm
- ✅ Quản lý vai trò và phân quyền
- ✅ Quản lý tài khoản admin
- ✅ Dashboard tổng quan
- ✅ Upload ảnh lên Cloudinary
- ✅ Tìm kiếm, lọc, phân trang
- ✅ Bulk actions (thay đổi nhiều sản phẩm cùng lúc)
- ✅ Rich text editor (TinyMCE)

### Client
- ✅ Xem danh sách sản phẩm
- ✅ Xem chi tiết sản phẩm
- ✅ Trang chủ

## Design Patterns

### MVC Pattern
- **Model**: Quản lý data và business rules
- **View**: Hiển thị data (Pug templates)
- **Controller**: Xử lý input và điều phối giữa Model và View

### Middleware Pattern
- Authentication, validation, error handling được xử lý qua middleware chain

### Module Pattern
- Code được chia nhỏ thành các module độc lập, dễ maintain

## Cấu trúc Database (MongoDB)

### Products Collection
```javascript
{
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  images: [String],
  slug: String (auto-generated),
  status: String,
  delete: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Categories Collection
- Quản lý danh mục sản phẩm với cấu trúc phân cấp

### Roles Collection
- Định nghĩa vai trò và permissions

### Users Collection
- Thông tin tài khoản admin

## Best Practices được áp dụng

1. **Separation of Concerns** - Tách biệt routes, controllers, models
2. **Reusable Components** - Helpers, middlewares có thể tái sử dụng
3. **Environment Variables** - Sử dụng .env cho config nhạy cảm
4. **Error Handling** - Middleware xử lý lỗi tập trung
5. **Validation** - Validate input trước khi xử lý
6. **Security** - Bcrypt cho password, JWT cho authentication

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## Giấy phép

ISC License


