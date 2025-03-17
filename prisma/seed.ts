import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword
    }
  });

  console.log('Admin user created:', admin.email);

  // Create test user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Test User',
      password: userPassword
    }
  });

  console.log('Test user created:', user.email);

  // Create products
  const products = [
    {
      name: 'iPhone 14 Pro',
      description: 'Latest iPhone with A16 Bionic chip, 48MP camera, and Dynamic Island',
      price: 999.99,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896',
      stock: 50
    },
    {
      name: 'MacBook Pro 16"',
      description: 'Powerful laptop with M2 Pro chip, up to 22 hours of battery life',
      price: 2499.99,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673666',
      stock: 30
    },
    {
      name: 'AirPods Pro',
      description: 'Premium wireless earbuds with Active Noise Cancellation and Adaptive Audio',
      price: 249.99,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361',
      stock: 100
    },
    {
      name: 'Apple Watch Ultra',
      description: 'The most rugged Apple Watch with precision GPS and up to 36 hours of battery life',
      price: 799.99,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQDY3ref_VW_34FR+watch-49-titanium-ultra_VW_34FR_WF_CO+watch-face-49-alpine-ultra_VW_34FR_WF_CO?wid=2000&hei=2000&fmt=png-alpha&.v=1683224241054',
      stock: 75
    },
    {
      name: 'iPad Pro 12.9"',
      description: 'Supercharged by M2 chip, with stunning Liquid Retina XDR display',
      price: 1099.99,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1664411207213',
      stock: 40
    },
    {
      name: 'Samsung Galaxy S23 Ultra',
      description: 'Premium Android phone with S Pen and 200MP camera',
      price: 1199.99,
      image: 'https://images.samsung.com/us/smartphones/galaxy-s23-ultra/images/galaxy-s23-ultra-highlights-kv.jpg',
      stock: 45
    },
    {
      name: 'Sony WH-1000XM5',
      description: 'Industry-leading noise cancelling headphones with exceptional sound quality',
      price: 399.99,
      image: 'https://electronics.sony.com/image/5d02da0c0d1c3b0e96aaed47e696c67c?fmt=png-alpha&wid=1200',
      stock: 60
    },
    {
      name: 'Dell XPS 15',
      description: '15-inch premium laptop with 12th Gen Intel Core processors',
      price: 1999.99,
      image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9520/media-gallery/black/laptop-xps-15-9520-t-black-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&wid=4000&hei=2800&qlt=100,0&resMode=sharp2&size=4000,2800',
      stock: 25
    }
  ];

  // Create all products at once
  await prisma.product.createMany({
    data: products
  });

  console.log('Products created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 