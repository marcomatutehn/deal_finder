import 'animate.css';
import 'react-notifications-component/dist/theme.css';

import * as React from 'react';
import ReactNotification from "react-notifications-component";
import { Subscription, SubscriptionResult } from "react-apollo";

type Props = {
  subscription: any;
  notificationStyle?: NotificationStyle;
  messageProperty: string;
  titleProperty?: string;
  duration?: number;
}

export type NotificationStyle = {
  type: string;
  position: string;
  animationIn: string;
  animationOut: string;
}


const defaultStyle: NotificationStyle = {
  type: 'info',
  position: 'top-right',
  animationIn: 'fadeInRight',
  animationOut: 'fadeOut'
}

export class Notifications extends React.Component<Props> {

  static defaultProps = {
    notificationStyle: defaultStyle,
    duration: 4000
  };

  render() {
    return (
      <React.Fragment>
        <Subscription subscription={this.props.subscription} fetchPolicy="no-cache">
          {(results: SubscriptionResult) => {
            if (results.loading && results.data === undefined) return null;
            if (results.data) {
              setTimeout(() => {
                if (this.props.notificationStyle !== undefined) {
                  ReactNotification.store.addNotification({
                    title: (this.props.titleProperty !== undefined ? results.data[Object.keys(results.data)[0]][this.props.titleProperty] : 'Alert'),
                    message: results.data[Object.keys(results.data)[0]][this.props.messageProperty],
                    insert: "top",
                    type: this.props.notificationStyle.type,
                    container: this.props.notificationStyle.position,
                    animationIn: ["animated", this.props.notificationStyle.animationIn, 'faster'],
                    animationOut: ["animated", this.props.notificationStyle.animationOut],
                    width: 300,
                    dismiss: {
                      duration: this.props.duration,
                      onScreen: false,
                      pauseOnHover: true,
                      waitForAnimation: true,
                      showIcon: true,
                      click: true,
                      touch: true
                    }
                  });
                }
              }, 0);
            }
            return null;
          }}
        </Subscription>
        <ReactNotification.default
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
        />
      </React.Fragment>
    )
  }

}



      // content: (
                    //   <div className='fadeIn fadeOut' style={{ width: 325, height : 80, backgroundColor: this.props.notificationStyle.backgroundColor, borderRadius: '2px' }}>
                    //     <div className="notification-content">
                    //       <p className="notification-message" style={{ color: this.props.notificationStyle.messageColor, fontFamily: 'Arial, sans-serif' }}>
                    //         {results.data[Object.keys(results.data)[0]][this.props.messageProperty]}
                    //       </p>
                    //     </div>
                    //   </div>
                    // )