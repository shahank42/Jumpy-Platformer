class Platform {
    constructor(x, y, w, h, col) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.top = this.y;
        this.left = this.x;
        this.bottom = this.y + this.height;
        this.right = this.x + this.width;

        this.col = col;
    }

    render() {
        stroke(0);
        strokeWeight(2);
        fill(this.col);
        rect(this.x, this.y, this.width, this.height);
    }
}