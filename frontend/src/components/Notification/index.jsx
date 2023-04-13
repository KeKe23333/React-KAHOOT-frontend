import { notification } from 'antd';

export default function Notification () {
  notification.config({ placement: 'topLeft', duration: 2 });
  notification.open({
    message: 'Notification Title',
    description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
