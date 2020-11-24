class Notes{
    constructor(
        id,
        notes_name,
        user_id,
        updated_by,
        status,
        created_at,
        updated_at
    ){
        this.id = id;
        this.notes_name = notes_name;
        this.updated_by = updated_by;
        this.user_id = user_id;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports ={
 Notes : Notes
} 