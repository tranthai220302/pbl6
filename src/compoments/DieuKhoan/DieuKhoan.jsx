import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import styles from './DieuKhoan.module.css'
function DieuKhoan({showExmaple, showCloseExample, setCheckBox, checkBox}) {
  return (
    <>
      <Modal show={showExmaple} fullscreen={true} onHide={showCloseExample}>
        <Modal.Header closeButton>
          <Modal.Title>
            Điều khoản đăng khi cửa hàng trên Harumi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
        <h4>1.Nguyên tắc chung</h4>
        <span>a. Đăng bán sản phẩm trên Harumi là hoạt động của Người bán dùng hàng hóa, dịch vụ và tài liệu về hàng hóa, dịch vụ để giới thiệu với khách hàng về hàng hóa, dịch vụ đó.</span> <br></br>
        <span>b. Khi đăng bán sản phẩm trên Harumi, Người bán có trách nhiệm tuân thủ các quy định tại Điều 117, Điều 120.4, Điều 121 của Luật thương mại và các văn bản quy phạm pháp luật có liên quan đến hoạt động trưng bày, giới thiệu hàng hóa, dịch vụ. </span><br></br>
        <span>c. Tất cả chứng từ mà Người bán được yêu cầu cung cấp thì Người bán phải đảm bảo và cam kết tất cả các chứng từ mà Người bán cung cấp cho Harumi đều được scan từ chứng từ gốc, không được làm giả, chỉnh sửa, tẩy xóa.</span>
        <h4>2.Các nội dung không được bán</h4>
        <span>a. Phản động, chống phá, bài xích tôn giáo, khiêu dâm, bạo lực, đi ngược lại thuần phong mỹ tục, truyền thống và văn hóa Việt Nam;</span><br></br>
        <span>b. Đăng thông tin rác, phá rối hay làm mất uy tín của các dịch vụ do Harumi cung cấp;</span><br></br>
        <span>c. Xúc phạm, khích bác đến người khác dưới bất kỳ hình thức nào;</span><br></br>
        <span>d. Những sản phẩm có tính chất phân biệt khiêu dâm, chủng tộc, xúc phạm đến dân tộc hoặc quốc gia nào đó</span><br></br>
        <span>e. Tài liệu bí mật quốc gia, bí mật nhà nước, bí mật kinh doanh, bí mật cá nhân;</span><br></br>
        <span>f.  Tuyên truyền về những thông tin mà pháp luật nghiêm cấm như: sử dụng heroin, thuốc lắc, giết người, cướp của,vv (VD: sản phẩm in hình lá cần sa, shisha);</span><br></br>
        <h4>3.Các hành vi không được thực hiện</h4>
        <span>a. Sử dụng thông tin, hình ảnh, âm thanh vi phạm pháp luật, thiếu thẩm mỹ, trái với truyền thống lịch sử, văn hóa, đạo đức, thuần phong mỹ tục Việt Nam. </span><br></br>
        <span>b. Sử dụng hình ảnh, lời nói, chữ viết của cá nhân khi chưa được cá nhân đó đồng ý, trừ trường hợp được pháp luật cho phép.</span><br></br>
        <span>c. So sánh trực tiếp về giá cả, chất lượng, hiệu quả sử dụng sản phẩm, hàng hóa, dịch vụ của mình với giá cả, chất lượng, hiệu quả sử dụng sản phẩm, hàng hóa, dịch vụ cùng loại của tổ chức, cá nhân khác.</span><br></br>
        <span>d. Đăng bán một sản phẩm lặp đi lặp lại (spam) trên cùng một danh mục hoặc các danh mục khác nhau.</span><br></br>
        <span>e. Thay đổi nội dung tin đăng để gian lận đánh giá</span><br></br>
        <span style={{fontStyle : 'italic'}}>Khuyến cáo: Người bán vui lòng tôn trọng và tuân thủ quy định đăng bán sản phẩm của Harumi và các quy định của pháp luật hiện hành. Mọi sản phẩm không tuân thủ theo các quy định, hướng dẫn trên hoặc các văn bản quy phạm pháp luật sẽ bị khóa/xóa mà không cần thông báo trước. 
            Người bán sẽ chịu hoàn toàn trách nhiệm trước Pháp luật nếu cố tình đăng tải các nội dung mà pháp luật Việt Nam không cho phép.</span><br></br>
        <div style={{display: 'flex', margin : 'auto', justifyContent: 'center', marginTop : '20px', gap : '5px', alignItems :"center"}}>
        <input type="checkbox" onChange={(e)=>{setCheckBox(e.target.value)}} />
        <label htmlFor="" style={{fontWeight : '600'}}>Đồng ý với các điều khoản</label>
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DieuKhoan;