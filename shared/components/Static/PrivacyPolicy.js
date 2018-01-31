import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="PrivacyPolicy-wapper">
        <div className="pri-plc-main text-center">
          <h2>Privacy Policy</h2>
          <p>
            We at The Noun Project, Inc. (“The Noun Project,” “we,” “us,” “our”) know that our users
            (“you,” “your”) care about how your personal information is used and shared, and we take
            your privacy seriously. Please read the following to learn more about our Privacy
            Policy. By visiting or using the Website or Services in any manner, you acknowledge that
            you accept the practices and policies outlined in this Privacy Policy, and you hereby
            consent that we will collect, use, and share your information in the following ways. Any
            capitalized terms used herein without definition shall have the meaning given to them in
            the Company Terms of Use.
          </p>
        </div>
        <div className="secd-section">
          <h2>I. WHAT DOES THIS PRIVACY POLICY COVER?</h2>
          <p>
            This Privacy Policy covers our treatment of personally identifiable information
            ("Personal Information") that we gather when you are accessing or using our Services.
            This policy does not apply to the practices of companies that we do not own or control,
            or to individuals that we do not employ or manage.
          </p>
          <p>
            We do not knowingly collect or solicit personal information from anyone under the age of
            13 or knowingly allow such persons to register for the Services (as that term is defined
            in our Terms of Use). If you are under 13, please do not attempt to register for the
            Services or send any information about yourself to us, including your name, address,
            telephone number, or email address. No one under age 13 may provide any personal
            information to us or on the Services. In the event that we learn that we have collected
            personal information from a child under age 13 without verification of parental consent,
            we will delete that information as quickly as possible. If you believe that we might
            have any information from or about a child under 13, please contact us at
            info@thenounproject.com.
          </p>
          <p>
            We gather various types of Personal Information from our users, as explained more fully
            below. We may use this Personal Information to personalize and improve our services, to
            allow our users to set up a user account and profile, to contact users, to fulfill your
            requests for certain products and services, to analyze how users utilize the Services,
            and as otherwise set forth in this Privacy Policy. We may share certain types of
            Personal Information with third parties, as described below.
          </p>
        </div>
        <div className="secd-section">
          <h2>I. WHAT DOES THIS PRIVACY POLICY COVER?</h2>
          <p>
            We receive and store any information you knowingly provide to us. For example, we
            collect Personal Information such as your name, email address, user name, and
            third-party account credentials (for example, your log-in credentials for Facebook or
            other third party sites). If you provide your third-party account credentials to us, you
            understand some content and/or information in those accounts (“Third Party Account
            Information”) may be transmitted into your account with us if you authorize such
            transmissions, and that Third Party Account Information transmitted to our Services is
            covered by this Privacy Policy. You can choose not to provide us with certain
            information, but then you may not be able to register with us or to take advantage of
            some of our features. We may anonymize your Personal Information so that you cannot be
            individually identified, and provide that information to our partners.
          </p>
          <p>
            If you have provided us with a means of contacting you, we may use such means to
            communicate with you. For example, we may send you promotional offers or communicate
            with you about your use of the Services. Also, we may receive a confirmation when you
            open a message from us. This confirmation helps us make our communications with you more
            interesting and improve our services. If you do not want to receive communications from
            us, please indicate your preference by following the unsubscribe link provided in each
            e-mail. Please note that if you do not want to receive legal notices from us, those
            legal notices will still govern your use of the Services, and you are responsible for
            reviewing such legal notices for changes.
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const PrivacyPolicy = state;
  return { PrivacyPolicy };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
