export const GET_ALL_NOTES_lISTS_QUERY = `
query {
   getAllNotesLists {
     id
     user {
          id
     }
   }
 }
`