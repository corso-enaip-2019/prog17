abstract class BaseModule_V1
{
    public string Name { get; protected set; }
    public string Description { get; protected set; }

    public BaseModule_V1(string name, string description)
    {
        Name = name;
        Description = description;
    }
}

class ProperModule_V1 : BaseModule_V1
{
    public ProperModule_V1 :
    base("Proper Module", "Test Module for Mockup")
    { }
}

//-----------------------------------------------------------
//-----------------------------------------------------------

class ModuleInfo_V2
{
    public string Name { get; private set; }
    public string Description { get; private set; }

    public ModuleInfo_V2(string name, string description)
    {
        Name = name;
        Description = description;
    }
}

abstract class BaseModule_V2
{
    public ModuleInfo_V2 ModuleInfo { get; protected set; }

    public BaseModule_V2(ModuleInfo_V2 moduleInfo)
    {
        ModuleInfo = moduleInfo;
    }
}

class ProperModule_V2 : BaseModule_V2
{
    public ProperModule_V2() :
    base(new ModuleInfo_V2("Proper Module", "Test Module for Mockup"))
    { }
}

//-----------------------------------------------------------
//-----------------------------------------------------------

interface IModuleInfo_V3
{
    string Name { get; }
    string Description { get; }
}

class ProperModuleInfo_V3 : IModuleInfo_V3
{
    string Name { get; private set; }
    string Description { get; private set; }
    
    public ProperModuleInfo_V3()
    {
        Name = "Proper Module";
        Description = "Test Module for Mockup";
    } 
}

abstract class BaseModule_V3
{
    public IModuleInfo_V3 ModuleInfo { get; protected set; }

    public BaseModule_V3(IModuleInfo_V3 moduleInfo)
    {
        ModuleInfo = moduleInfo;
    }
}

class ProperModule_V3 : BaseModule_V3
{
    public ProperModule_V3() : base(new ProperModuleInfo_V3()) { }
}

//-----------------------------------------------------------
//-----------------------------------------------------------

List<IModuleInfo> modules = AppDomain.CurrentDomain.GetAssemblies()
                                                   .SelectMany(x => x.GetTypes())
                                                   .Where(x => typeof(IModuleInfo).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                                                   .Select(t => t.GetConstructor(null).Invoke(null) as IModuleInfo)
                                                   .ToList();