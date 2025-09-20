var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql2');
const cors = require('cors');
var app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// step 1: rong workbench mở cửa sổ sql và chạy lệnh
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
//step 2:
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    insecureAuth: true,
    database: "shop"
});
//step 1
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!")
    var sql = "SELECT * FROM products";
    con.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results);
    })
});

//RESTFull API
app.get('/getAll', function (req, res) {
    var sql = "SELECT * FROM products";
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
})

app.post('/register', function (req, res) {
    const { username, password, phone, email } = req.body;

    if (!username || !password || !phone || !email) {
        return res.status(400).send({ message: "Thiếu thông tin đăng ký" });
    }

    const sql = "INSERT INTO Users (username, password, phone, email) VALUES (?, ?, ?, ?)";
    con.query(sql, [username, password, phone, email], function (err, result) {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).send({ message: "Username hoặc Email đã tồn tại" });
            }
            throw err;
        }
        res.send({ message: "Đăng ký thành công", id: result.insertId });
    });
});

app.post('/login', function (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: "Thiếu username hoặc password" });
    }

    const sql = "SELECT * FROM Users WHERE username = ? AND password = ?";
    con.query(sql, [username, password], function (err, results) {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).send({ message: "Sai username hoặc password" });
        }

        res.send({ 
            message: "Đăng nhập thành công", 
            user: {
                id: results[0].id,
                username: results[0].username,
                phone: results[0].phone,
                email: results[0].email
            }
        });
    });
});

app.post('/orders', function (req, res) {
    const { user_id, items } = req.body;
    // items là array [{ product_id, quantity, price }, ...]

    if (!user_id || !items || items.length === 0) {
        return res.status(400).send({ message: "Thiếu thông tin đơn hàng" });
    }

    // Tính tổng tiền
    const total_price = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Insert vào Orders
    const orderSql = "INSERT INTO Orders (user_id, total_price, created_at) VALUES (?, ?, NOW())";
    con.query(orderSql, [user_id, total_price], function (err, result) {
        if (err) throw err;

        const orderId = result.insertId;

        // Chuẩn bị dữ liệu cho OrderItems
        const orderItems = items.map(item => [orderId, item.product_id, item.quantity, item.price]);

        const orderItemsSql = "INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES ?";
        con.query(orderItemsSql, [orderItems], function (err2) {
            if (err2) throw err2;

            res.send({
                message: "Tạo đơn hàng thành công",
                order_id: orderId,
                total_price: total_price
            });
        });
    });
});



var server = app.listen(5555, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})