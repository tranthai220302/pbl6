import React, { useState } from 'react'
import styles from './BodyHomeStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUser, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';

export default function BodyHomeStore() {
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
        </div>
    )
}