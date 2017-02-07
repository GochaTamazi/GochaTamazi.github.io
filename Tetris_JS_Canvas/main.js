function CGLobals()
{
    this.VK_LEFT = 25;
    this.VK_UP = 26;
    this.VK_RIGHT = 27;
    this.VK_DOWN = 28;
    this.LEFT = false;
    this.UP = false;
    this.RIGHT = false;
    this.DOWN = false;
    this.color = ['white', 'lightsalmon', 'red', 'blue', 'purple', 'lightgreen', 'lightblue', 'yellow'];
    this.Interval1 = null;
    this.Interval2 = null;
    this.DateFirst = 0;
    this.DateNext = 0;
    this.MyCanvas = null;
    this.contexMyCanvas = null;
}

function CLevel(fie, fig)
{
    this.Field;
    this.Figure;
    this.Next_Type;
    this.next_type;
    this.Lines_Count;
    this.Speed;
    this.timer;
    this.type;
    this.CLevel = function (fie, fig)
    {
        this.Field = fie;
        this.Figure = fig;

        this.Next_Type = new CFigure(this.Field.X + this.Field.Size_X + 2, this.Field.Y, this.Field.Size_X, this.Field.Size_Y);

        this.next_type = (Math.random() * 100 % 6).toFixed(0);
        this.Next_Type.Bild_Figure(this.next_type);
        this.type = (Math.random() * 100 % 6).toFixed(0);
        this.Figure.Bild_Figure(this.type);
        this.Lines_Count = 0;
        this.Speed = 10;
        this.timer = 0;

        CGLobals.MyCanvas = document.getElementById("MyCanvas");
        CGLobals.contexMyCanvas = CGLobals.MyCanvas.getContext("2d");

        this.Next_Type.Show();
    }
    this.CLevel(fie, fig);
    this.Check = function (d)
    {
        switch (d)
        {
            case control.VK_RIGHT:
                for (var i = 0; i < this.Figure.Size_X; i++)
                {
                    for (var j = 0; j < this.Figure.Size_Y; j++)
                    {
                        if (this.Figure.Mas[i][j])
                        {
                            if (i + this.Figure.X - this.Field.X + 1 >= this.Field.Size_X)
                            {
                                return false;
                            }
                            if (this.Field.Mas[i + this.Figure.X - this.Field.X + 1][j + this.Figure.Y - this.Field.Y])
                            {
                                return false;
                            }
                        }
                    }
                }
                break;
            case control.VK_LEFT:
                for (var i = 0; i < this.Figure.Size_X; i++)
                {
                    for (var j = 0; j < this.Figure.Size_Y; j++)
                    {
                        if (this.Figure.Mas[i][j])
                        {
                            if (i + this.Figure.X - this.Field.X - 1 < 0)
                            {
                                return false;
                            }
                            if (this.Field.Mas[i + this.Figure.X - this.Field.X - 1][j + this.Figure.Y - this.Field.Y])
                            {
                                return false;
                            }
                        }
                    }
                }
                break;
            case control.VK_DOWN:
                for (var i = 0; i < this.Figure.Size_X; i++)
                {
                    for (var j = 0; j < this.Figure.Size_Y; j++)
                    {
                        if (this.Figure.Mas[i][j])
                        {
                            if (j + this.Figure.Y - this.Field.Y + 1 >= this.Field.Size_Y)
                            {
                                return false;
                            }
                            if (this.Field.Mas[i + this.Figure.X - this.Field.X][j + this.Figure.Y - this.Field.Y + 1])
                            {
                                return false;
                            }
                        }
                    }
                }
                break;
            case control.VK_UP:
                var tmp = new CFigure(this.Figure.X, this.Figure.Y, this.Figure.Size_X, this.Figure.Size_Y);
                for (var i = 0; i < tmp.Size_X; i++)
                {
                    for (var j = 0; j < tmp.Size_Y; j++)
                    {
                        tmp.Mas[i][j] = this.Figure.Mas[i][j];
                    }
                }
                tmp.Spin_Figure(this.type);
                for (var x = 0; x < tmp.Size_X; x++)
                {
                    for (var y = 0; y < tmp.Size_Y; y++)
                    {
                        if (tmp.Mas[x][y])
                        {
                            if ((this.Figure.X + x) >= (this.Field.X + this.Field.Size_X))
                            {
                                return false;
                            }
                            if ((this.Figure.X + x) < this.Field.X)
                            {
                                return false;
                            }
                            if (this.Field.Mas[x + this.Figure.X - this.Field.X][y + this.Figure.Y - this.Field.Y])
                            {
                                return false;
                            }
                        }
                    }
                }
                break;
            default:
                alert(d);
                break;
        }
        return true;
    }
    this.Check_Field_Line = function ()
    {
        var cout = this.Field.Size_X;
        for (var j = 0; j < this.Field.Size_Y; j++)
        {
            cout = this.Field.Size_X;
            for (var i = 0; i < this.Field.Size_X; i++)
            {
                if (this.Field.Mas[i][j])
                {
                    cout--;
                    if (!cout)
                        return true;
                }
            }
        }
        return false;
    }
    this.Action = function ()
    {
        this.timer++;
        if (this.timer >= 1000000)
        {
            this.timer = 0;
        }
        if (this.timer % this.Speed == 0)
        {
            this.Drop();
            this.Field.Show();
            this.Figure.Show();
        }
        if (control.UP)
        {
            if (this.Check(control.VK_UP))
            {
                this.Figure.Spin_Figure(this.type);
                this.Field.Show();
                this.Figure.Show();
            }
        }
        if (control.LEFT)
        {
            if (this.Check(control.VK_LEFT))
            {
                this.Figure.X--;
                this.Field.Show();
                this.Figure.Show();
            }
        }
        if (control.RIGHT)
        {
            if (this.Check(control.VK_RIGHT))
            {
                this.Figure.X++;
                this.Field.Show();
                this.Figure.Show();
            }
        }
        if (control.DOWN)
        {
            if (this.Check(control.VK_DOWN))
            {
                this.Figure.Y++;
                this.Field.Show();
                this.Figure.Show();
            }
            else
            {
                this.Set_Field();
                if (this.Check_Field_Line())
                {
                    this.Lines_Count = this.Lines_Count + this.Field.Delete_Line();
                    if (this.Lines_Count > 0 && this.Lines_Count <= 10)
                    {
                        this.Speed = 10;
                    }
                    if (this.Lines_Count > 10 && this.Lines_Count <= 20)
                    {
                        this.Speed = 9;
                    }
                    if (this.Lines_Count > 20 && this.Lines_Count <= 30)
                    {
                        this.Speed = 8;
                    }
                    if (this.Lines_Count > 30 && this.Lines_Count <= 40)
                    {
                        this.Speed = 7;
                    }
                    if (this.Lines_Count > 40 && this.Lines_Count <= 50)
                    {
                        this.Speed = 6;
                    }
                    if (this.Lines_Count > 50 && this.Lines_Count <= 60)
                    {
                        this.Speed = 5;
                    }
                    if (this.Lines_Count > 60 && this.Lines_Count <= 70)
                    {
                        this.Speed = 4;
                    }
                    if (this.Lines_Count > 70 && this.Lines_Count <= 80)
                    {
                        this.Speed = 3;
                    }
                    if (this.Lines_Count > 80 && this.Lines_Count <= 90)
                    {
                        this.Speed = 2;
                    }
                    if (this.Lines_Count > 90 && this.Lines_Count <= 100)
                    {
                        this.Speed = 1;
                    }
                }
            }
        }
    }
    this.Drop = function ()
    {
        if (this.Check(control.VK_DOWN))
        {
            this.Figure.Y++;
        }
        else
        {
            this.Set_Field();
            if (this.Check_Field_Line())
            {
                this.Lines_Count = this.Lines_Count + this.Field.Delete_Line();
            }
        }
    }
    this.Set_Field = function ()
    {
        for (var i = 0; i < this.Figure.Size_X; i++)
        {
            for (var j = 0; j < this.Figure.Size_Y; j++)
            {
                if (this.Figure.Mas[i][j])
                {
                    this.Field.Mas[i + this.Figure.X - this.Field.X][j + this.Figure.Y - this.Field.Y] = this.Figure.Mas[i][j];
                }
            }
        }
        this.Figure.Clear_Figure();
        this.type = this.next_type;
        this.next_type = (Math.random() * 100 % 6).toFixed(0);
        this.Next_Type.Clear_Figure();
        this.Next_Type.Bild_Figure(this.next_type);
        this.Next_Type.Show();
        this.Figure.Bild_Figure(this.type);
        this.Figure.X = this.Field.X + 3;
        this.Figure.Y = this.Field.Y;
    }
    this.Show = function ()
    {
        var X = this.Field.X + this.Field.Size_X + 2;
        var Y = this.Field.Y + 6;
        CGLobals.contexMyCanvas.clearRect(X * 20, 0, 300, 300);
        this.Next_Type.Show();
        CGLobals.contexMyCanvas.font = "Bold 35px Times New Roman";
        CGLobals.contexMyCanvas.fillStyle = "royalblue";
        var str = "Lines: " + this.Lines_Count;
        CGLobals.contexMyCanvas.fillText(str, X * 20, Y * 20);
        Y++;
        Y++;
        CGLobals.contexMyCanvas.font = "Bold 35px Times New Roman";
        CGLobals.contexMyCanvas.fillStyle = "royalblue";
        var str = "Speed: " + (11 - this.Speed);
        CGLobals.contexMyCanvas.fillText(str, X * 20, Y * 20);
        if (this.Field.Mas[3][3] || this.Field.Mas[4][3] || this.Field.Mas[5][3] || this.Field.Mas[6][3])
        {
            Y += 0;
            X -= 17;
            CGLobals.contexMyCanvas.font = "Bold 80px Times New Roman";
            CGLobals.contexMyCanvas.fillStyle = "royalblue";
            CGLobals.contexMyCanvas.fillText("GAME OVER", X * 20, Y * 20 + 80);
            clearInterval(control.Interval1);
            clearInterval(control.Interval2);
        }
    }
}
function CObject(x, y, s_x, s_y)
{
    this.Size_X;
    this.Size_Y;
    this.X;
    this.Y;
    this.Mas;
    this.CObject = function (x, y, s_x, s_y)
    {
        this.X = x;
        this.Y = y;
        this.Size_X = s_x;
        this.Size_Y = s_y;
        this.Mas = [];
        for (var i = 0; i < this.Size_X; i++)
        {
            this.Mas[i] = [];
        }
        for (var x = 0; x < this.Size_X; x++)
        {
            for (var y = 0; y < this.Size_Y; y++)
            {
                this.Mas[x][y] = 0;
            }
        }
    }
    this.CObject(x, y, s_x, s_y);
    this.Show = function ()
    {
        var X;
        var Y;
        for (var x = 0; x < this.Size_X; x++)
        {
            X = x + this.X;
            for (var y = 0; y < this.Size_Y; y++)
            {
                Y = y + this.Y;
                var S = 20;
                if (this.Mas[x][y])
                {
                    CGLobals.contexMyCanvas.fillStyle = control.color[this.Mas[x][y]];
                    CGLobals.contexMyCanvas.fillRect(X * S,  Y * S, S, S);
                }
                else
                {
                    CGLobals.contexMyCanvas.fillStyle = "Black";
                    CGLobals.contexMyCanvas.fillRect(X * S,  Y * S, S, S);
                }
            }
        }
    }
}
function CField(x, y, s_x, s_y)
{
    this.CField = function (x, y, s_x, s_y)
    {
        this.CObject(x, y, s_x, s_y);
    }
    this.CField(x, y, s_x, s_y);
    this.Delete_Line = function ()
    {
        var Count = this.Size_X, first = 0, L_count = 0;
        var b = true;
        for (var j = 0; j < this.Size_Y; j++)
        {
            Count = this.Size_X;
            for (var i = 0; i < this.Size_X; i++)
            {
                if (this.Mas[i][j])
                {
                    if (b)
                    {
                        first = j;
                        b = false;
                    }
                    Count--;
                    if (!Count)
                    {
                        for (var z = this.Size_Y - 1; z > first; z--)
                        {
                            for (var s = 0; s < this.Size_X; s++)
                            {
                                if (z > j)
                                {
                                    this.Mas[s][z] = this.Mas[s][z];
                                }
                                if (z <= j)
                                {
                                    this.Mas[s][z] = this.Mas[s][z - 1];
                                }
                            }
                        }
                        for (var e = 0; e < this.Size_X; e++)
                        {
                            this.Mas[e][first] = 0;
                        }
                        L_count++;
                        L_count = L_count + this.Delete_Line();
                        return L_count;
                    }
                }
            }
        }
        return 0;
    }
}
CField.prototype = new CObject();
function CFigure(x, y, s_x, s_y)
{
    this.CFigure = function (x, y, s_x, s_y)
    {
        this.CObject(x, y, s_x, s_y);
    }
    this.CFigure(x, y, s_x, s_y);
    this.Bild_Figure = function (I)
    {
        I = parseInt(I);
        switch (I)
        {
            case 0:
                for (var i = 0; i < 4; i++)
                {
                    this.Mas[i][3] = I + 1;
                }
                break;
            case 1:
                for (var i = 0; i < 2; i++)
                {
                    for (var j = 0; j < 2; j++)
                    {
                        this.Mas[i + 1][j + 2] = I + 1;
                    }
                }
                break;
            case 2:
                for (var i = 0; i < 3; i++)
                {
                    this.Mas[i][2] = I + 1;
                }
                this.Mas[0][3] = I + 1;
                break;
            case 3:
                for (var i = 0; i < 3; i++)
                {
                    this.Mas[i][2] = I + 1;
                }
                this.Mas[2][3] = I + 1;
                break;
            case 4:
                for (var i = 0; i < 2; i++)
                {
                    for (var j = 0; j < 2; j++)
                    {
                        this.Mas[i + j][j + 2] = I + 1;
                    }
                }
                break;
            case 5:
                for (var i = 1; i < 3; i++)
                {
                    for (var j = 0; j < 2; j++)
                    {
                        this.Mas[i - j][j + 2] = I + 1;
                    }
                }
                break;
            case 6:
                for (var i = 0; i < 3; i++)
                {
                    this.Mas[i][2] = I + 1;
                }
                this.Mas[1][3] = I + 1;
                break;
            default:
                break;
        }
    }
    this.Clear_Figure = function ()
    {
        for (var x = 0; x < 4; x++)
        {
            for (var y = 0; y < 4; y++)
            {
                this.Mas[x][y] = 0;
            }
        }
    }
    this.Show = function ()
    {
        var XX = 0;
        var YY = 0;
        for (var x = 0; x < this.Size_X; x++)
        {
            XX = x + this.X;
            for (var y = 0; y < this.Size_Y; y++)
            {
                YY = y + this.Y;
                if (this.Mas[x][y])
                {
                    var S = 20;
                    CGLobals.contexMyCanvas.fillStyle = control.color[this.Mas[x][y]];
                    CGLobals.contexMyCanvas.fillRect(XX * S, YY * S, S, S);
                }
            }
        }
    }
    this.Spin_Figure = function (I)
    {
        I = parseInt(I);
        switch (I)
        {
            case 0:
                if (this.Mas[3][3])
                {
                    this.Clear_Figure();
                    for (var i = 0; i < 4; i++)
                        this.Mas[0][i] = I + 1;
                }
                else
                {
                    this.Clear_Figure();
                    this.Bild_Figure(0);
                }
                break;
            case 1: break;
            case 2:
                if (this.Mas[0][3] && this.Mas[1][3] && this.Mas[2][3] && this.Mas[2][2])
                {
                    this.Clear_Figure();
                    for (var i = 0; i < 3; i++)
                        this.Mas[1][i + 1] = I + 1;
                    this.Mas[0][1] = I + 1;
                }
                else
                    if (this.Mas[1][1] && this.Mas[1][2] && this.Mas[1][3] && this.Mas[0][1])
                    {
                        this.Clear_Figure();
                        this.Bild_Figure(2);
                    }
                    else
                        if (this.Mas[0][1] && this.Mas[0][2] && this.Mas[0][3] && this.Mas[1][3])
                        {
                            this.Clear_Figure();
                            for (var i = 0; i < 3; i++)
                                this.Mas[i][3] = I + 1;
                            this.Mas[2][2] = I + 1;
                        }
                        else
                            if (this.Mas[0][2] && this.Mas[0][3] && this.Mas[1][2] && this.Mas[2][2])
                            {
                                this.Clear_Figure();
                                for (var i = 0; i < 3; i++)
                                    this.Mas[0][i + 1] = I + 1;
                                this.Mas[1][3] = I + 1;
                            }
                break;
            case 3:
                if (this.Mas[0][2] && this.Mas[1][2] && this.Mas[2][2] && this.Mas[2][3])
                {
                    this.Clear_Figure();
                    for (var i = 0; i < 3; i++)
                        this.Mas[2][i + 1] = I + 1;
                    this.Mas[1][3] = I + 1;
                }
                else
                    if (this.Mas[2][1] && this.Mas[2][2] && this.Mas[2][3] && this.Mas[1][3])
                    {
                        this.Clear_Figure();
                        for (var i = 0; i < 3; i++)
                            this.Mas[i][3] = I + 1;
                        this.Mas[0][2] = I + 1;
                    }
                    else
                        if (this.Mas[0][3] && this.Mas[1][3] && this.Mas[2][3] && this.Mas[0][2])
                        {
                            this.Clear_Figure();
                            for (var i = 0; i < 3; i++)
                                this.Mas[0][i + 1] = I + 1;
                            this.Mas[1][1] = I + 1;
                        }
                        else
                            if (this.Mas[0][1] && this.Mas[0][2] && this.Mas[0][3] && this.Mas[1][1])
                            {
                                this.Clear_Figure();
                                this.Bild_Figure(3);
                            }
                break;
            case 4:
                if (this.Mas[1][3] && this.Mas[2][3])
                {
                    this.Clear_Figure();
                    this.Mas[1][2] = I + 1;;
                    this.Mas[1][3] = I + 1;;
                    this.Mas[2][2] = I + 1;;
                    this.Mas[2][1] = I + 1;;
                }
                else
                {
                    this.Clear_Figure();
                    this.Bild_Figure(4);
                }
                break;
            case 5:
                if (this.Mas[0][3] && this.Mas[1][3])
                {
                    this.Clear_Figure();
                    this.Mas[0][1] = I + 1;;
                    this.Mas[0][2] = I + 1;;
                    this.Mas[1][2] = I + 1;;
                    this.Mas[1][3] = I + 1;;
                }
                else
                {
                    this.Clear_Figure();
                    this.Bild_Figure(5);
                }
                break;
            case 6:
                if (this.Mas[0][2] && this.Mas[1][2] && this.Mas[2][2] && this.Mas[1][3])
                {
                    this.Clear_Figure();
                    for (var i = 0; i < 3; i++)
                        this.Mas[1][i + 1] = I + 1;
                    this.Mas[0][2] = I + 1;
                }
                else
                    if (this.Mas[1][1] && this.Mas[1][2] && this.Mas[1][3] && this.Mas[0][2])
                    {
                        this.Clear_Figure();
                        for (var i = 0; i < 3; i++)
                            this.Mas[i][2] = I + 1;
                        this.Mas[1][1] = I + 1;
                    }
                    else
                        if (this.Mas[0][2] && this.Mas[1][2] && this.Mas[2][2] && this.Mas[1][1])
                        {
                            this.Clear_Figure();
                            for (var i = 0; i < 3; i++)
                                this.Mas[1][i + 1] = I + 1;
                            this.Mas[2][2] = I + 1;
                        }
                        else
                            if (this.Mas[1][1] && this.Mas[1][2] && this.Mas[1][3] && this.Mas[2][2])
                            {
                                this.Clear_Figure();
                                this.Bild_Figure(6);
                            }
                break;
            default:
                alert(I);
                break;
        }
    }
}
CFigure.prototype = new CObject();
function Main()
{
    Level.Action();
    Level.Next_Type.Show();
    Field.Show();
    Figure.Show();
    Level.Show();
}
function Time()
{
    control.DateNext = new Date();
    var second = (control.DateNext - control.DateFirst) / 1000
    second = second.toFixed(0);
    second = parseInt(second);
    if (second > 175)
    {
        control.DateFirst = new Date();
    }
}
function HTMLAllLoad()
{
    try
    {
        control = new CGLobals();
        Field = new CField(10, 2, 10, 22);
        Figure = new CFigure(13, 2, 4, 4);
        Level = new CLevel(Field, Figure);
        Field.Show();
        Figure.Show();
        control.Interval1 = setInterval(Main, 75);
        control.DateFirst = new Date();
        control.Interval2 = setInterval(Time, 5000);
    }
    catch (error)
    {
        alert(error.name + '\n\n' + error.message + '\n\n' + error.stack);
    }
}
function KeyDown(event)
{
    if (event.keyCode == 38)
    {
        control.UP = true;
    }
    if (event.keyCode == 40)
    {
        control.DOWN = true;
    }
    if (event.keyCode == 39)
    {
        control.RIGHT = true;
    }
    if (event.keyCode == 37)
    {
        control.LEFT = true;
    }
}
function KeyUp(event)
{
    if (event.keyCode == 38)
    {
        control.UP = false;
    }
    if (event.keyCode == 40)
    {
        control.DOWN = false;
    }
    if (event.keyCode == 39)
    {
        control.RIGHT = false;
    }
    if (event.keyCode == 37)
    {
        control.LEFT = false;
    }
}