function HTMLAllLoad() {
    try {
        new Game();
    } catch (error) {
        alert(error.name + '\n\n' + error.message + '\n\n' + error.stack);
    }
}
