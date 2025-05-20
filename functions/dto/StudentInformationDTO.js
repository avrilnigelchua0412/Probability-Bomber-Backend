class StudentInformationDTO {
    constructor(quizName, className, studentName, studentInformation){
        this.quizName = quizName;
        this.className = className;
        this.studentName = studentName;
        this.studentInformation = studentInformation
    }
    getInformationNames() {
        return {
            quizName: this.quizName,
            className: this.className,
            studentName: this.studentName
        };
    }
    static fromRequestBody(body) {
        return new StudentInformationDTO(
            body.quizName,
            body.className,
            body.studentName,
            body.studentInformation
        );
    }
}
module.exports = StudentInformationDTO;