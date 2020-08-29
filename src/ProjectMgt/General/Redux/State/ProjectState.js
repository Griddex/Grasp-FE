export const projectMgtState = {
  projects: [],
  taskGroups: [],
  tasks: [],
  currentUser: null,
  roles: [
    {
      name: "HR Manager",
      id: "1234",
    },
    {
      name: "Admin",
      id: "12124",
    },
  ],
  employmentTypes: [
    {
      type: "Temporary",
      name: "1562",
    },
    {
      type: "Fixed-term",
      name: "1122",
    },
    {
      type: "Full-time",
      name: "11112",
    },
    {
      type: "Part-time",
      name: "1442",
    },
  ],
  positions: [
    {
      name: "CEO",
      id: "1223",
    },
    {
      name: "Manager",
      id: "1221",
    },
    {
      name: "Engineer",
      id: "12344",
    },
    {
      name: "Intern",
      id: "9887",
    },
    {
      name: "Senior Engineer",
      id: "13137",
    },
  ],
  companies: [
    {
      id: "123",
      name: "Grasp Consulting",
      dateCreated: "2013-02-04T18:35:24+00:00",
      status: "Shutdown",
    },
    {
      id: "1123",
      name: "Grasp Training",
      dateCreated: "2013-02-04T18:35:24+00:00",
      status: "Active",
    },
  ],
  users: [
    {
      id: "dfafafaf",
      firstName: "John",
      lastName: "Mark",
      userName: "johnmark",
      emailAddress: "john.mark@grasp.io",
      address1: "No 22 Adeboye Street, Abuja",
      address2: "No 21 Mina Street, Enugu",
      title: "Mr",
      dateOfBirth: "2013-02-04T18:35:24+00:00",
      role: "Admin",
      position: "Engineer",
      profilePictureUrl: "",
      dateCreated: "2013-02-04T18:35:24+00:00",
      accountStatus: "Active",
      gender: "Male",
    },
    {
      id: "dfafdfa12",
      firstName: "Jane",
      lastName: "Mary",
      userName: "janemary",
      emailAddress: "jane.mary@grasp.io",
      Address: "No 22 Adeboye Street, Abuja",
      title: "Mr",
      dateOfBirth: "2013-02-04T18:35:24+00:00",
      role: "Employee",
      position: "CEO",
      profilePictureUrl: "",
      dateCreated: "2013-02-04T18:35:24+00:00",
      accountStatus: "Active",
      gender: "female",
    },
    {
      id: "22362jhg",
      firstName: "Dianne",
      lastName: "Marx",
      userName: "diannemarx",
      emailAddress: "dianne.marx@grasp.io",
      Address: "No 22 Adeboye Street, Abuja",
      title: "Mr",
      dateOfBirth: "2013-02-04T18:35:24+00:00",
      role: "Employee",
      position: "Admin",
      profilePictureUrl: "",
      dateCreated: "2013-02-04T18:35:24+00:00",
      accountStatus: "Active",
      gender: "female",
    },
  ],
  files: [
    {
      id: "12155",
      fileName: "File01",
      fileSize: "1212314",
      folderId: "",
    },
    {
      id: "22244",
      fileName: "File02",
      fileSize: "772314",
      folderId: "",
    },
    {
      id: "524944",
      fileName: "File03",
      fileSize: "212554",
      folderId: "1212667",
    },
  ],
  folders: [
    {
      id: "1212667",
      folderName: "Folder01",
      parentFolderId: "",
    },
    {
      id: "998822",
      folderName: "Folder02",
      parentFolderId: "",
    },
    {
      id: "0797979",
      folderName: "Folder03",
      parentFolderId: "1212667",
    },
  ],
};
