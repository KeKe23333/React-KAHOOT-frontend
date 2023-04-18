import { notification } from 'antd';

export default function Notification (props) {
  let color = '#C1FFC1';
  if (props.type === 'error') {
    color = '#CD5B45';
  }
  notification.config({ placement: 'top', duration: 2 });
  notification.open({
    message: props.message,
    style: { backgroundColor: color },
    // description:
    //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
