import Employee from '../../models/SpecificInfo/Employee';
import Specific from '../../models/SpecificInfo/Specific';
import GeneralArea from '../../models/SpecificInfo/GeneralArea';
import File from '../../models/SpecificInfo/File';
import SpecificArea from '../../models/SpecificInfo/SpecificArea';
import Characteristic from '../../models/SpecificInfo/Characteristic';
import AreaCharacteristic from '../../models/SpecificInfo/AreaCharacteristic';

class SpecificInfoController {
  async index(req, res) {
    const employees = await Employee.findAll({
      where: { company_id: req.companyId },
      order: [['kind', 'ASC']],
      attributes: ['id', 'kind', 'amount'],
    });

    const specific = await Specific.findOne({
      where: { company_id: req.companyId },
      attributes: ['id', 'cnpj', 'document_type'],
    });

    const generalArea = await GeneralArea.findOne({
      where: { company_id: req.companyId },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path'],
        },
      ],
    });

    const specificAreas = await SpecificArea.findAll({
      where: { company_id: req.companyId },
      attributes: ['id', 'kind', 'area'],
      include: [
        {
          model: Characteristic,
          as: 'characteristics',
          attributes: ['id', 'title'],
          through: {
            model: AreaCharacteristic,
          },
        },
      ],
    });

    return res.json({ employees, specific, generalArea, specificAreas });
  }
}

export default new SpecificInfoController();
