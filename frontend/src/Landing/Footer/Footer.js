import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { css } from 'aphrodite';
import { footerStyles } from '../../styles/landingStyles';
import gmail from '../../assets/gmail-logo.png';
import facebook from '../../assets/facebook-logo.png';
import twitter from '../../assets/twitter-logo.png';
import instagram from '../../assets/instagram-logo.png';
import whatsapp from '../../assets/whatsapp-logo.png';
import telegram from '../../assets/telegram-logo.png';
import { getFullYear } from '../../utils/utils';

class Footer extends React.Component {
  render() {
    return (
      <div className={css(footerStyles.footerDiv)}>
        <Container>
          <Row>
            <h1 className={css(footerStyles.header)}>Contact Us</h1>
            <Col md={4}>
              <h4>SCHEDULR</h4>
              <p>0701234567</p>
              <p>My Address</p>
              <p>00100</p>
            </Col>
            <Col md={8} className={css(footerStyles.gridContainer)}>
              <img src={gmail} alt='gmail' aria-label="gmail" className={css(footerStyles.gridContainerItem)}/>
              <img src={facebook} alt='facebook' aria-label="facebook" className={css(footerStyles.gridContainerItem)}/>
              <img src={twitter} alt='twitter' aria-label="twitter" className={css(footerStyles.gridContainerItem)}/>
              <img src={instagram} alt='instagram' aria-label="instagram" className={css(footerStyles.gridContainerItem)}/>
              <img src={whatsapp} alt='whatsapp' aria-label="whatsapp" className={css(footerStyles.gridContainerItem)}/>
              <img src={telegram} alt='telegram' aria-label="telegram" className={css(footerStyles.gridContainerItem)}/>
            </Col>
          </Row>
        </Container>
        <hr className={css(footerStyles.hr)}/>
        <Container>
          <Row>
            <Col md={4} className={css(footerStyles.col)}>
              <p>&copy; {getFullYear()} Schedulr</p>
            </Col>
            <Col md={4} className={css(footerStyles.col)}>
              <p>Privacy Policy</p>
            </Col>
            <Col md={4} className={css(footerStyles.col)}>
              <p>Terms of Use</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
