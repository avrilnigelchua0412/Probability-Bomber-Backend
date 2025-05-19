class StudentInformationHelper {
    static createDefault(classIds = [], studentIdsByClass = {}) {
        const studentInformation = {};

        classIds.forEach(classId => {
            studentInformation[classId] = {};
            (studentIdsByClass[classId] || []).forEach(studentId => {
                studentInformation[classId][studentId] = {
                    score: 0,
                    timeCompletion: 0.0,
                    noAttempts: 0,
                };
            });
        });

        return studentInformation;
    }
}

module.exports = StudentInformationHelper;