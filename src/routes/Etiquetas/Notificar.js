import {notification} from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const NotificacionNitabara = (type: NotificationType,titulo,mensaje) => {
  notification[type]({
    message: titulo,
    description:mensaje
  });
};