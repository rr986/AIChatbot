import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { data: session, status } = useSession();
  const { t, i18n } = useTranslation();

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [...messages, newMessage],
      }),
    });
    const data = await response.json();
    setMessages([...messages, newMessage, { role: 'assistant', content: data.response }]);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('es')}>Español</button>
      {status === 'loading' && <p>Loading...</p>}
      {!session && status !== 'loading' && (
        <>
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <div>
            <p>Welcome, {session.user.name}</p>
            <button onClick={signOut}>Sign out</button>
          </div>
          <div>
            {messages.map((message, index) => (
              <div key={index} className={message.role}>
                <strong>{message.role === 'user' ? 'You' : 'Bot'}: </strong>
                {message.content}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </>
      )}
    </div>
  );
}
