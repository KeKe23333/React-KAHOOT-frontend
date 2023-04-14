import { notification } from 'antd';

export default function Notification (props) {
  notification.config({ placement: 'topLeft', duration: 2 });
  notification.open({
    message: props.message,
    // description:
    //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
