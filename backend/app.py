from flask import Flask, render_template, redirect, url_for, jsonify, request
from user import User

def register_user(name:str, password:str, usrlist) -> bool:
    target = [usr for usr in user_list if usr.m_username == name]
    if len(target) > 0:
        usr = target[0]
        if usr.is_correct(password):
            return True
        else:
            False
    else:
        usrlist.append(User(name, password))
        return True

user_list = []
cur_username = None

app = Flask(__name__, template_folder='../frontend/templates', static_folder='../frontend/static')

@app.route('/')
@app.route('/login')
def index():
    return render_template('sign-in.html')

@app.route('/succeed')
def succeed():
    return render_template('school-net.html')

@app.route('/submit', methods=["POST"])
def handelLogIn():
    global cur_username
    print(request.json)
    if register_user(request.json.get('username'),request.json.get('password'), user_list):
        cur_username = request.json.get('username')
        return redirect(url_for('succeed'))
    else:
        render_template('sign-in.html')

@app.route('/logout', methods=['POST'])
def handelLogOut():
    for i in range(len(user_list)):
        if user_list[i].m_username == cur_username:
            user_list[i].increase_traffic()
            return redirect(url_for('index'))
    exit(-1)

@app.route('/traffic')
def getTraffic():
    global cur_username
    print(cur_username)
    for usr in user_list:
        if usr.m_username == cur_username:
            return jsonify({'username': usr.m_username, 'traffic': usr.get_traffic()})
    exit(-1)
