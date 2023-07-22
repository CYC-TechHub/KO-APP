import React from 'react';
import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Select, MenuItem, Button, TextField } from '@mui/material';
import useUserMeetings from './useUserMeetings';
import "./App.css";

const TimezoneOptions = ['CST', 'EST', 'PST', 'MST'];

function App() {
  const {
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
  } = useUserMeetings();

  return (
    <Container maxWidth="md" sx={{ paddingTop: 20 }}>
      <div>
        <TextField
          select
          label="Filter Meetings"
          value={filter}
          onChange={handleFilterChange}
          sx={{ marginRight: 2 }}
        >
          <MenuItem value="Upcoming">Upcoming</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </TextField>
      </div>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Timezone</TableCell>
              <TableCell>Scheduled Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Attended</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userMeetings.map((meeting, index) => (
              <TableRow key={meeting.id}>
                <TableCell>
                  {editMeetings.some((editedMeeting) => editedMeeting.id === meeting.id) ? (
                    <TextField
                      label="Name"
                      name="name"
                      value={meeting.name}
                      onChange={(e) => handleUserDetailsChange(index, 'name', e.target.value)}
                    />
                  ) : (
                    meeting.name
                  )}
                </TableCell>
                <TableCell>
                  {editMeetings.some((editedMeeting) => editedMeeting.id === meeting.id) ? (
                    <TextField
                      label="Contact Number"
                      name="contact_number"
                      value={meeting.contact_number}
                      onChange={(e) => handleUserDetailsChange(index, 'contact_number', e.target.value)}
                    />
                  ) : (
                    meeting.contact_number
                  )}
                </TableCell>
                <TableCell>
                  {editMeetings.some((editedMeeting) => editedMeeting.id === meeting.id) ? (
                    <TextField
                      label="Email"
                      name="email"
                      value={meeting.email}
                      onChange={(e) => handleUserDetailsChange(index, 'email', e.target.value)}
                    />
                  ) : (
                    meeting.email
                  )}
                </TableCell>
                <TableCell>
                  {editMeetings.some((editedMeeting) => editedMeeting.id === meeting.id) ? (
                    <TextField
                      select
                      name="timezone"
                      value={meeting.timezone}
                      onChange={(e) => handleUserDetailsChange(index, 'timezone', e.target.value)}
                    >
                      {TimezoneOptions.map((timezone) => (
                        <MenuItem key={timezone} value={timezone}>
                          {timezone}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    meeting.timezone
                  )}
                </TableCell>
                <TableCell>
                  {editMeetings.some((editedMeeting) => editedMeeting.id === meeting.id) ? (
                    <TextField
                      label="Scheduled Time"
                      name="scheduled_time"
                      value={meeting.scheduled_time}
                      onChange={(e) => handleUserDetailsChange(index, 'scheduled_time', e.target.value)}
                    />
                  ) : (
                    new Date(meeting.scheduled_time).toLocaleString()
                  )}
                </TableCell>
                <TableCell>
                  {editMeetings.some((editedMeeting) => editedMeeting.id === meeting.id) ? (
                    <TextField
                      select
                      name="status"
                      value={meeting.status}
                      onChange={(e) => handleStatusChange(index, e)}
                      sx={{ minWidth: 100 }}
                    >
                      <MenuItem value="Upcoming">Upcoming</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </TextField>
                  ) : (
                    meeting.status
                  )}
                </TableCell>
                <TableCell>
                  {meeting.attended ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                  {editMeetings.some((editedMeeting) => editedMeeting.id === meeting.id) ? (
                    <>
                      <Button variant="contained" onClick={() => handleSaveNotes()} sx={{ marginRight: 2 }}>
                        Save Notes
                      </Button>
                      <Button variant="outlined" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleEditClick(meeting)}
                      disabled={meeting.status === 'Completed'}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
