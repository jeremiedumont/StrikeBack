//
//  JsonManager.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/18/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation
import SwiftUI

public class AnswerDAO {
    
    static var currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
    static let rootURL : String = "https://strike-back.herokuapp.com/answers/"
    
    //----------------------------------
    //---------- GET requests ----------
    //----------------------------------
    /*
     Find X answers sorted by date skipping the Y firsts answers of the entire statement
        GET request
        Params:
            order →  1 or -1 (from the older or from the latest)
            skip → number of remarks to skip
            number → number of remarks to get
        https://strike-back.herokuapp.com/answers/sorted/date?order=&skip=&number=
     */
    static func getSortedAnswersByDate(order : Int, skip : Int, number : Int) -> [Answer]{
        // Prepare URL
        let preString : String = AnswerDAO.rootURL + "sorted/date"
        let postString = "?order="+String(order)+"&skip="+String(skip)+"&number="+String(number)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
        
        // Perform HTTP Request
        var res : [Answer] = []
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            // Convert HTTP Response Data to a String
            if let data = data{
                
                do{
                    res = try JSONDecoder().decode([Answer].self, from: data)
                    
                }catch let error {
                    print(error)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
    /*
    Find X answers sorted by pertinency skipping the Y firsts answers of the entire statement
        GET request
        Params:
            order →  1 or -1 (from the older or from the latest)
            skip → number of remarks to skip
            number → number of remarks to get
        https://strike-back.herokuapp.com/answers/sorted/pertinency?order=&skip=&number=
         */
    static func getSortedAnswersByPertinency(order : Int, skip : Int, number : Int) -> [Answer]{
        // Prepare URL
        let preString = AnswerDAO.rootURL + "sorted/heard"
        let postString = "?order="+String(order)+"&skip="+String(skip)+"&number="+String(number)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
        
        // Perform HTTP Request
        var res : [Answer] = []
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            // Convert HTTP Response Data to a String
            if let data = data{
                
                do{
                    res = try JSONDecoder().decode([Answer].self, from: data)
                    
                }catch let error {
                    print(error)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
    /*
    Find every answers of a user with their id
    GET request
    Params:
        id → id of a user
    https://strike-back.herokuapp.com/answers/findByUserId?id=

     */
    static func getAllUserAnswers() -> [Answer] {
        // Prepare URL
        guard let token = currentUser?.authToken else{return []}
        let preString = AnswerDAO.rootURL + "findByUserId"
        let postString = "?token="+String(token)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
        
        // Perform HTTP Request
        var res : [Answer] = []
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            // Convert HTTP Response Data to a String
            if let data = data{
                
                do{
                    res = try JSONDecoder().decode([Answer].self, from: data)
                    
                }catch let error {
                    print(error)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
    
    /*
     Find a answers with the id of its remark
     GET request
     Params:
            id → id of a remark
     https://strike-back.herokuapp.com/answers/findByRemark?id=
     */
    static func getAnswersByRemarkId(remarkId : String) -> [Answer] {
        // Prepare URL
        let preString = AnswerDAO.rootURL + "findByRemark"
        let postString = "?id="+String(remarkId)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
        
        // Perform HTTP Request
        var res : [Answer] = []
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            // Convert HTTP Response Data to a String
            if let data = data{
                
                do{
                    res = try JSONDecoder().decode([Answer].self, from: data)
                    
                }catch let error {
                    print(error)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
    /*
     Find an answer with the id
     GET request
     Params:
        id → id of the answer
     https://strike-back.herokuapp.com/answers/?id=
     */
    static func getAnswer(answerId : String) -> Answer?{
        // Prepare URL
        let preString = AnswerDAO.rootURL + ""
        let postString = "?id="+String(answerId)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
        
        // Perform HTTP Request
        var res : Answer? = nil
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            // Convert HTTP Response Data to a String
            if let data = data{
                
                do{
                    res = try JSONDecoder().decode(Answer.self, from: data)
                    
                }catch let error {
                    print(error)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
    
    //----------------------------------
    //---------- POST requests ---------
    //----------------------------------
    
    /*
    Add an answer
    POST request
    Body:
        userId
        remarkId
        content
     https://strike-back.herokuapp.com/answers/add

     */
    static func addAnswer (ans : Answer) -> Bool{
        // Prepare URL
        guard let token = currentUser?.authToken else{return false}
        let stringurl = AnswerDAO.rootURL + "add?token="+token
        let url = URL(string: stringurl)//ICI
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "POST"
        let semaphore = DispatchSemaphore(value :0)
        var res : Bool = false
        // Set HTTP Request Body
        do{
            //try  print(JSONSerialization.jsonObject(with: JSONEncoder().encode(rem), options: []))
            //let json = try JSONSerialization.jsonObject(with: JSONEncoder().encode(rem), options: [])
            request.httpBody = try JSONEncoder().encode(ans)
            
        }catch let error {
            print(error)
        }
        
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        print("json : " , String(data : request.httpBody!, encoding: .utf8)!)
        // Perform HTTP Request
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            let resp = response as? HTTPURLResponse
            res = (resp?.statusCode == 200)
            
            if let data = data{
                if let jsonString = String(data: data, encoding: .utf8){
                    print(jsonString)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        return res
    }
    
    
    
    //----------------------------------
    //---------- PUT requests ----------
    //----------------------------------
    
    /*
    Increment the up value of an answer
    PUT request
    Params:
        id → id of the answer
    https://strike-back.herokuapp.com/answers/up?id=

     */
    static func addUp(answerId : String) -> Bool {
        // Prepare URL
        guard let token = currentUser?.authToken else{return false}
        let preString = AnswerDAO.rootURL + "up"
        let postString = "?id="+String(answerId)+"&token="+token
        let url = URL(string: preString+postString)
        
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "PUT"
        
        let semaphore = DispatchSemaphore(value :0)
        
        // Perform HTTP Request
        var res : Bool = false
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            } else {
                let resp = response as? HTTPURLResponse
                res = (resp?.statusCode == 200) //true si on a bien increment le heard
                if let data = data {
                    if let jsonString = String(data: data, encoding: .utf8){
                        print(jsonString)
                    }
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
    /*
     Increment the down value of an answer
     PUT request
     Params:
        id → id of the answer
     https://strike-back.herokuapp.com/answers/down?id=

     */
    static func addDown(answerId : String) -> Bool {
        // Prepare URL
        guard let token = currentUser?.authToken else{return false}
        let preString = AnswerDAO.rootURL + "down"
        let postString = "?id="+String(answerId) + "&token=" + token
        let url = URL(string: preString+postString)
        
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "PUT"
        
        let semaphore = DispatchSemaphore(value :0)
        
        // Perform HTTP Request
        var res : Bool = false
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            } else {
                let resp = response as? HTTPURLResponse
                res = (resp?.statusCode == 200) //true si on a bien increment le heard
                if let data = data {
                    if let jsonString = String(data: data, encoding: .utf8){
                        print(jsonString)
                    }
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
    
    //----------------------------------
    //---------- DELETE requests -------
    //----------------------------------
    
    /*
     Delete an answer with their id
     DELETE request
     Params:
        id → id of the answer
     https://strike-back.herokuapp.com/answers/delete?id=
     */
    static func deleteAnswer(answerId : String) -> Bool{
        // Prepare URL
        guard let token = currentUser?.authToken else{return false}
        let stringurl = rootURL + "delete?token="+token
        let url = URL(string: stringurl)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "DELETE"
        
        // HTTP Request Parameters which will be sent in HTTP Request Body
        let postString = "id="+answerId;
        // Set HTTP Request Body
        request.httpBody = postString.data(using: String.Encoding.utf8);
        var res : Bool = false
        // Perform HTTP Request
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            // Convert HTTP Response Data to a String
            let resp = response as? HTTPURLResponse
            res = (resp?.statusCode == 200)
            
        }
        task.resume()
        return res
    }
    
}


