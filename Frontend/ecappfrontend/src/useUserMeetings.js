import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your Django backend URL

const useUserMeetings = () => {
  const [userMeetings, setUserMeetings] = useState([]);
  const [editMeetings, setEditMeetings] = useState([]);
  const [filter, setFilter] = useState(''); // Add the filter state

  useEffect(() => {
    axios.get(`${BASE_URL}/user-meetings/`)
      .then(response => {
        setUserMeetings(response.data);
      })
      .catch(error => {
        console.error('Error fetching user meetings:', error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update the filter state with the selected value
  };

  const handleEditClick = (meeting) => {
    setEditMeetings((prevEditMeetings) => [...prevEditMeetings, { ...meeting }]);
  };

  const handleNotesChange = (index, event) => {
    const { name, value } = event.target;
    setEditMeetings((prevEditMeetings) => {
      const updatedMeetings = [...prevEditMeetings];
      updatedMeetings[index][name] = value;
      return updatedMeetings;
    });
  };

  const handleStatusChange = (index, event) => {
    const { name, value } = event.target;
    setEditMeetings((prevEditMeetings) => {
      const updatedMeetings = [...prevEditMeetings];
      updatedMeetings[index][name] = value;
      return updatedMeetings;
    });
  };

  const handleUserDetailsChange = (index, field, value) => {
    setEditMeetings((prevEditMeetings) => {
      const updatedMeetings = [...prevEditMeetings];
      updatedMeetings[index][field] = value;
      return updatedMeetings;
    });
  };

  const handleSaveNotes = () => {
    editMeetings.forEach((editedMeeting) => {
      const { id, notes, status, attended, name, contact_number, email, timezone, scheduled_time } = editedMeeting;
      axios.patch(`${BASE_URL}/user-meetings/${id}/`, { notes, status, attended, name, contact_number, email, timezone, scheduled_time })
        .then(response => {
          setUserMeetings((prevMeetings) => {
            const updatedMeetings = prevMeetings.map(meeting => {
              if (meeting.id === id) {
                return { ...meeting, notes, status, attended, name, contact_number, email, timezone, scheduled_time };
              } else {
                return meeting;
              }
            });
            return updatedMeetings;
          });
        })
        .catch(error => {
          console.error('Error updating notes:', error);
        });
    });
    setEditMeetings([]);
  };

  const handleCancelEdit = () => {
    setEditMeetings([]);
  };

  return {
    userMeetings,
    editMeetings,
    filter,
    handleFilterChange,
    handleEditClick,
    handleNotesChange,
    handleStatusChange,
    handleUserDetailsChange,
    handleSaveNotes,
    handleCancelEdit,
  };
};

export default useUserMeetings;
