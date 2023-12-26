import React, { useState } from 'react'
import styles from './BodyHomeStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUser, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function BodyHomeStore() {
    const data = [
        { name: 'Tháng 1', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Tháng 2', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Tháng 3', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Tháng 4', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Tháng 5', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Tháng 6', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Tháng 7', uv: 3490, pv: 4300, amt: 2100 },
      ];
    return(
        <div className={styles.BodyHomeStore}>
            <div className={styles.BodyHomeStore_Item}>
                <div className={styles.BodyHomeStore_Title}>
                    Công việc cần làm
                </div>
                <div className={styles.BodyHomeStore_Content}>
                    <table className={styles.NeedWork}>
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <tr>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Chờ xác nhận</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Chờ lấy hàng</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Đã xử lý</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Đơn hủy</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Trả hàng/Hoàn tiền chờ xử lý</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Sản phẩm bị tạm khóa</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Sản phẩm hết hàng</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Chương trình khuyến mãi chờ xử lý</span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className={styles.BodyHomeStore_Item}>
                <div className={styles.BodyHomeStore_Title}>
                    Phân tích bán hàng hôm nay
                </div>
                <div className={styles.BodyHomeStore_Sales_Content}>
                    <div className={styles.Sales_Chart}>
                        <span>Doanh số</span>
                        <LineChart width={500} height={150} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                    <div className={styles.sales}>
                        <div className={styles.Sales_Item}>
                            <span>Lượt truy cập</span>
                            <span className={styles.number}>0</span>
                            <span className={styles.compare}>So với hôm qua: 100%</span>
                        </div>
                        <div className={styles.Sales_Item}>
                            <span>Doanh số</span>
                            <span className={styles.number}>0</span>
                            <span className={styles.compare}>So với hôm qua: 100%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}