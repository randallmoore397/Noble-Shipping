from flask import Blueprint, render_template, redirect, url_for, request

shipping = Blueprint('shipping',__name__)



@shipping.route('/live/games',methods=['GET','POST'])
def login():
    
    title = "Live Games"
    return render_template('main/login.html',title=title)