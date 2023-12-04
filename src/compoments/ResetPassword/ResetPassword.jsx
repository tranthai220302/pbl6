import React, { useState } from 'react'
import styles from './ResetPassword.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUser, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';

export default function ResetPassword() {
    return(
        <div className={styles.ResetPassword}>
            <div className={styles.ResetPassword_Title}>
                Đổi mật khẩu
            </div>
            <div className={styles.ResetPassword_Content}>
                <table>
                    <colgroup>
                        <col width='30%'/>
                        <col />
                    </colgroup>
                    <tr>
                        <th>Mật khẩu cũ</th>
                        <td>
                            <input type="password" name="oldpassword" id="oldpassword" />
                        </td>
                    </tr>
                    <tr>
                        <th>Mật khẩu mới</th>
                        <td>
                            <input type="password" name='newpassword'/>
                        </td>
                    </tr>
                    <tr>
                        <th>Nhắc lại mật khẩu mới</th>
                        <td>
                            <input type="password" name="renewpassword" id="" />
                        </td>
                    </tr>
                </table>
                <div className={styles.btn_save}>
                    <button>Lưu mật khẩu</button>
                </div>
            </div>
        </div>
    )
}