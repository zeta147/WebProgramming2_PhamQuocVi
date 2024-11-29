<template>
    <div>
        <h1>This is a vocabulary builder application</h1><br>
        <h2>Developer:</h2>
        <table>
            <tbody>
                <tr>
                    <th>
                        <div class="avatar"></div>
                    </th>
                    <th>
                        <div class="student_info">
                            <p>Student name: Pham Quoc Vi</p>
                            <p>Student ID: 001325753</p>
                            <p>Course name: Web programming 2</p>
                            <p>Course code: COMP 1842</p>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "AboutMe"
}
</script>

<style>
div.avatar {
    background-image: url("./Images/Mualani_Avatar.jpg");
    background-color: black;
    width: 150px;
    height: 150px;
    border-radius: 50%;

}

div.student_info{
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-style: normal;
    text-align: left;
}

table{
    border-radius: 2%;
    border: solid;
}
</style>
