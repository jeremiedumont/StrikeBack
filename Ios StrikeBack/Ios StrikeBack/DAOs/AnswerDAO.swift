//
//  JsonManager.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/18/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

public class AnswerDAO {
    
    let rootURL : String = "https://strike-back.herokuapp.com/answers/"

    //----------------------------------
    //---------- GET requests ----------
    //----------------------------------

    static func getSortedAnswersByDate(order : Int, skip : Int, number : Int) -> [Answer]{
        // Prepare URL
        let preString = rooturl + "sorted/date"
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

    static func getSortedAnswersByPertinency(order : Int, skip : Int, number : Int) -> [Answer]{
        // Prepare URL
        let preString = rooturl + "sorted/heard"
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

    static func getAllUserAnswers(userId : String) -> [Answer] {
        // Prepare URL
        let preString = rooturl + "findByUserId"
        let postString = "?id="+String(userId)
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

    static func getAnswer(answerId : String) -> Answer?{
        // Prepare URL
        let preString = rooturl + ""
        let postString = "?id="+String(answerId)
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

    //----------------------------------
    //---------- POST requests ---------
    //----------------------------------

    static func addAnswer (rem : Answer) -> Bool{
        // Prepare URL
        let url = URL(string: rooturl + "add")//ICI
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
            request.httpBody = try JSONEncoder().encode(rem)
            
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

    static func addUp(answerId : String) -> Bool {
        // Prepare URL
        let preString = rooturl + "up"
        let postString = "?id="+String(answerId)
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

    static func addDown(answerId : String) -> Bool {
        // Prepare URL
        let preString = rooturl + "down"
        let postString = "?id="+String(answerId)
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
    
    static func deleteAnswer(answerId : String) -> Bool{
        // Prepare URL
        let url = URL(string: rooturl + "delete")
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


