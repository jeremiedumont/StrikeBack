//
//  JsonManager.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/18/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

class JsonManager {
    
    static func getPersons(path : String) -> [Person] {
        
        guard let mainUrl = Bundle.main.url(forResource: path, withExtension: "json") else { return []}
                
        do {
            let documentDirectory = try FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor:nil, create:false)
            let subUrl = documentDirectory.appendingPathComponent(path+".json")
            return loadFile(mainPath: mainUrl, subPath: subUrl)
        } catch {
            print(error)
        }
        /*guard let mainPath = Bundle.main.url(forResource: path, withExtension: "json")
            else{
                return []
        }
        let dir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first
        if let mainPath = dir?.appendingPathComponent(path+".json") {
            if FileManager.default.fileExists(atPath: mainPath.path){
            // charge celui du répertoire document de l'app
            }else{
                
            }
        }
            else {
                // charge celui du bundle

                    guard let mainPath = Bundle.main.url(forResource: path, withExtension: "json")
                        else{
                            return []
                    }
            }
        
        do{
            
        
        let jsonData = try Data(contentsOf: mainPath)
        let decoder = JSONDecoder()
        personlist = try decoder.decode([Person].self, from: jsonData)
        }
        catch {}
        
        */
        
    
    return []
    }
    
    static func loadFile(mainPath: URL, subPath: URL) -> [Person]{
        if FileManager.default.fileExists(atPath: subPath.path){
            return decodeData(pathName: subPath)
            
            /*if athleteList.isEmpty{
                decodeData(pathName: mainPath)
            }*/
            
        }else{
           return decodeData(pathName: mainPath)
        }
        
        
    }
    
    static func decodeData(pathName: URL)  -> [Person]{
        do{
            let jsonData = try Data(contentsOf: pathName)
            let decoder = JSONDecoder()
            return try decoder.decode([Person].self, from: jsonData)
        } catch {
            print("COUCOU")
        }
        return []
    }
}

