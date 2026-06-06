import React from 'react';
import Card from '../components/Card';
import Input from '../components/Input';

const Contact = () => {
  return (
    <div className="page contact-page">
      <h1>Contact Us</h1>
      <Card title="Send us a message">
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Input label="Name" name="name" placeholder="Your Name" />
          <Input label="Email" name="email" type="email" placeholder="you@example.com" />
          <button type="submit" style={{ alignSelf: 'flex-start' }}>Send Message</button>
        </form>
      </Card>
    </div>
  );
};

export default Contact;
