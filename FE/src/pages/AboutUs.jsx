import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutUs() {
  const [bannerUrl, setBannerUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        
        if (res.data && res.data.length > 0) {
          // Lấy bài viết mới nhất làm ảnh banner cho trang giới thiệu
          const latestPost = res.data[res.data.length - 1]; 
          
          if (latestPost.image) {
            setBannerUrl('http://localhost:5000/images/' + latestPost.image);
          }
        }
      } catch (error) {
        console.error('Lỗi lấy ảnh banner:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerImage();
  }, []);

  return (
    <div className="about-page" style={{ backgroundColor: '#fff' }}>
      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
        

        {/* Tiêu đề trang */}
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase' }}>
          GIỚI THIỆU VỀ NEW SNEAKER
        </h2>

        {/* Banner */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', minHeight: '300px', alignItems: 'center' }}>
          {isLoading ? (
            <p style={{ color: '#666' }}>Đang tải hình ảnh từ server...</p>
          ) : bannerUrl ? (
            <img 
              src={bannerUrl} 
              alt="Giới thiệu New Sneaker" 
              style={{ maxWidth: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} 
            />
          ) : (
            <p style={{ color: 'red' }}>Không có dữ liệu ảnh.</p>
          )}
        </div>

        {/* Nội dung Giới thiệu */}
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>
          <p style={{ marginBottom: '15px' }}>
            Chào mừng bạn đến với <strong>New Sneaker</strong>! Được thành lập với niềm đam mê bất tận dành cho những đôi giày thể thao, New Sneaker không chỉ là một cửa hàng mua sắm, mà còn là nơi kết nối cộng đồng những người yêu giày (sneakerheads) và đam mê thời trang đường phố tại Việt Nam.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '25px', marginBottom: '15px' }}>
            Tầm nhìn & Sứ mệnh
          </h3>
          <p style={{ marginBottom: '15px' }}>
            Chúng tôi luôn nỗ lực không ngừng để mang đến cho khách hàng những mẫu giày mới nhất, đa dạng về kiểu dáng và luôn bắt kịp xu hướng toàn cầu. Sứ mệnh của New Sneaker là cung cấp những sản phẩm chất lượng nhất, giúp bạn tự tin thể hiện phong cách cá nhân, cá tính riêng biệt và bước đi vững chãi trên mọi hành trình.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '25px', marginBottom: '15px' }}>
            Vì sao bạn nên chọn New Sneaker?
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Sản phẩm đa dạng:</strong> Cập nhật liên tục các bộ sưu tập mới nhất từ các thương hiệu hàng đầu.</li>
            <li style={{ marginBottom: '8px' }}><strong>Cam kết chất lượng:</strong> Mọi sản phẩm đến tay khách hàng đều được kiểm tra kỹ lưỡng về chất lượng và độ bền.</li>
            <li style={{ marginBottom: '8px' }}><strong>Giá cả hợp lý:</strong> Mang đến mức giá tốt nhất cùng nhiều chương trình ưu đãi hấp dẫn.</li>
            <li style={{ marginBottom: '8px' }}><strong>Dịch vụ tận tâm:</strong> Đội ngũ nhân viên tư vấn nhiệt tình, sẵn sàng hỗ trợ bạn 24/7.</li>
            <li style={{ marginBottom: '8px' }}><strong>Giao hàng toàn quốc:</strong> Nhanh chóng, an toàn và hỗ trợ đổi trả linh hoạt.</li>
          </ul>

          <p style={{ marginTop: '30px', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center', fontSize: '16px' }}>
            Cảm ơn bạn đã tin tưởng và đồng hành cùng New Sneaker. Hãy cùng chúng tôi tạo nên những bước chân phong cách!
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}