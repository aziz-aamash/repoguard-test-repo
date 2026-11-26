import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function EventList({ events, onSelect, onDelete }) {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('events changed', events.length);
  });

  const visible = events
    .filter((e) => e.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column' }}>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search events"
      />
      {visible.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          style={{ border: '1px solid #ddd', margin: 8 }}
          options={{ showDate: true, showBranch: true }}
          onClick={() => onSelect(event)}
          onRemove={() => onDelete(event.id)}
        />
      ))}
    </div>
  );
}

function EventCard({ event, style, options, onClick, onRemove }) {
  return (
    <div style={style}>
      <h3 onClick={onClick}>{event.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: event.description }} />
      {options.showDate && <small>{event.date}</small>}
      <button onClick={onRemove}>Delete</button>
    </div>
  );
}
